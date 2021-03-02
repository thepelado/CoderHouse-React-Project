import React, { useContext } from 'react';
import { getFirestore } from '../Firebase';
import firebase from 'firebase/app';
import sha1 from 'sha1';
export const FirebaseContext = React.createContext(false);
export const useFirebaseContext = () => useContext(FirebaseContext);


const FirebaseProvider = ({ children }) => {

    const db = getFirestore();
 
    /* Items */
    const getAllItems = () => {    
        return db.collection('ITEMS').where('stock', "!=", 0).get();
    }

    const getItemByID = (itemId) => {
        return db.collection('ITEMS').doc(itemId).get();
    }

    const getItemsByCategory = (category) => {
        return db.collection('ITEMS').where('category', '==', category).get();
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
                            await db.collection('ITEMS').doc(cartItem.item.id).update({ stock: productData.stock -= cartItem.qty });//db.collection('ITEMS').doc(cartItem.item.id).update({ stock : productData.stock});
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
            const res = await db.collection('USERS').add(data);
            data.password = sha1(data.password);
            if (res.id) {
                localStorage.setItem('user', JSON.stringify({ id: res.id, nombre: data.nombre, phone: data.phone, email: data.email }));
                resolve({ id: res.id, nombre: data.nombre, phone: data.phone, email: data.email });
            } else {
                reject('Error al almacenar en Firebase');
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
        console.log(userId);
        return db.collection('ORDERS').where('buyer.id', '==', userId).get();
    }


    return (
        <FirebaseContext.Provider value={{ getAllItems, getItemByID, getItemsByCategory, createOrder, getOrderByID, getOrdersByUser, updateStock, registerUser, loginUser}}>
            {children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseProvider;