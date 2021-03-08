import React, { useContext } from 'react';
import { getFirestore } from '../Firebase';
import firebase from 'firebase/app';
import sha1 from 'sha1';

export const FirebaseContext = React.createContext(false);
export const useFirebaseContext = () => useContext(FirebaseContext);

const FirebaseProvider = ({ children }) => {

    const db = getFirestore();
 
    /* Categories */
    const getAllCategories = () => {    
        return new Promise( (resolve, reject) => {
            try {
                db.collection('CATEGORIES')
                .get()
                .then((value) => {
                    resolve(value.docs.map( (category) => {
                        return { id: category.id, ...category.data() }
                    }));
                });
            } catch (error) {
                reject(`Ocurrió un error: ${error}`);
            }
        });
    }
    /* Items */
    const getAllItems = () => {    
        return new Promise( (resolve, reject) => {
            try {
                db.collection('ITEMS')
                .where('stock', "!=", 0)
                .get()
                .then(async(value) => {
                    let itemList = await Promise.all(value.docs.map( async (product) => {
                        const CategoriasCollection = db.collection('CATEGORIES');
                        let auxCategorias = await CategoriasCollection.doc(product.data().categoryID).get()
                        return { id: product.id, ...product.data(), category:auxCategorias.data().description }
                    }))
                    resolve(itemList);
                });
            } catch (error) {
                reject(`Ocurrió un error: ${error}`);
            }
        });
    }

    const getItemByID = (itemId) => {
        return new Promise( (resolve, reject) => {
            try {
                db.collection('ITEMS')
                .doc(itemId)
                .get()
                .then(async(product) => {
                    if (product.data()) {
                        const CategoriasCollection = db.collection('CATEGORIES');
                        let itemCategory = await CategoriasCollection.doc(product.data().categoryID).get()
                        resolve({ id: product.id, ...product.data(), category:itemCategory.data().description });
                    } else {
                        reject(`Producto no existente`);
                    }
                });
            } catch (error) {
                reject(`Ocurrió un error: ${error}`);
            }
        });
    }

    const getItemsByCategory = (category) => {
        return new Promise( async(resolve, reject) => {
            try {
                let queryCategoria = await db.collection('CATEGORIES').where('key', '==', category.toLowerCase()).get()
                if (queryCategoria.docs.length == 1 )
                {
                    let categoryID = queryCategoria.docs.[0].id;
                    let queryItems = await db.collection('ITEMS').where('categoryID', '==', categoryID).get();
                    let itemList = await queryItems.docs.map( (product) => {
                        return { id: product.id, ...product.data(), category:category }
                    })
                    resolve(itemList);
                } else {
                    reject(`No existe la categoría: ${category}`);
                }
            } catch (error) {
                reject(`Ocurrió un error: ${error}`);
            }
        });
    }

    const updateStock = (cart) => {
        return new Promise((resolve, reject) => {
            cart.map(async(cartItem) => {
                let query = await db.collection('ITEMS').doc(cartItem.item.id).get();
                if (!query.empty) {
                    const productData = query.data();
                    if (productData.stock >= cartItem.qty) {
                        //Resto el stock
                        productData.stock -= cartItem.qty;
                        //Actualizo las existencias
                        try {
                            await db.collection('ITEMS').doc(cartItem.item.id).update({ stock: productData.stock });
                        } catch(e) {
                            reject('Error al operar sobre la Base de Datos');
                        }
                    }
                    else {
                        reject(`No existen suficientes ${productData.title} para cubrir la demanda`);
                    }
                } else {
                    reject('No existe el producto en la DB');
                }
            })
            resolve(true);
        });
    }

    /*Users*/
    const registerUser = (data) => {
        return new Promise(async(resolve, reject) => {
            //Reviso que el mail ya no este en uso 
            const query = await db.collection('USERS').where("email", "==", data.email).get();
            if (query.docs.length == 0)
            {
                const res = await db.collection('USERS').add(data);
                data.password = sha1(data.password);
                if (res.id) {
                    localStorage.setItem('user', JSON.stringify({ id: res.id, nombre: data.nombre, phone: data.phone, email: data.email }));
                    resolve({ id: res.id, nombre: data.nombre, phone: data.phone, email: data.email });
                } else {
                    reject('Error al almacenar en Firebase');
                }
            } else {
                reject('Email ya utilizado');
            }
        });
    }

    const loginUser = (data) => {
        return new Promise(async(resolve, reject) => {
            data.password = sha1(data.password);
            const query =  await db.collection('USERS').where('email', '==', data.email).get();
            if (!query.empty) {
                const snapshot = query.docs[0];
                const userData = snapshot.data();
                if (data.password == userData.password) {
                    localStorage.setItem('user', JSON.stringify({ id: snapshot.id, nombre: userData.nombre, phone: userData.phone, email: userData.email }));
                    resolve({ id: snapshot.id, nombre: userData.nombre, phone: userData.phone, email: userData.email });
                } else {
                    reject('Usuario/Contraseña no válidos');
                }
            } else {
                reject('Usuario/Contraseña no válidos');
            }
        });
    }

    /* Orders */
    const createOrder = async(data) => {
        return new Promise(async(resolve, reject) => {
            const FieldValue = db.FieldValue;
            const newOrder = {
                ...data,
                date: firebase.firestore.Timestamp.fromDate(new Date())
            }
            const res = await db.collection('ORDERS').add(newOrder);
            if (res.id) {
                resolve({ id: res.id, ...newOrder });
            } else {
                reject('Error al almacenar en Firebase');
            }
        });
    }

    const getOrderByID = (orderId) => {
        return db.collection('ORDERS').doc(orderId).get();
    }

    const getOrdersByUser = (userId) => {
        return db.collection('ORDERS').where('buyer.id', '==', userId).get();
    }

    return (
        <FirebaseContext.Provider value={{ getAllCategories, getAllItems, getItemByID, getItemsByCategory, createOrder, getOrderByID, getOrdersByUser, updateStock, registerUser, loginUser}}>
            {children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseProvider;