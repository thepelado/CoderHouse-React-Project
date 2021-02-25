import React, { useState, useEffect, useContext } from 'react';

export const WishListContext = React.createContext([]);
export const useWishListContext = () => useContext(WishListContext);

const WishListProvider = ({ defaultValue = [], children }) => {

    const wishlistLocalStorage = JSON.parse(localStorage.getItem('wishlist'));
    const [wishList, setWishList] = useState(wishlistLocalStorage && wishlistLocalStorage.length > 0 ? wishlistLocalStorage : defaultValue);

    const updateItemWishList = async(item) => {
        if (!isInWishList(item.id)) {
            const newWishList = [...wishList, item];
            setWishList(newWishList);
        } else {
            removeItemWishList(item);
        }        
    }

    const removeItemWishList = (item) => {
        setWishList(wishList.filter(wishListItem => wishListItem.id != item.id));
    }

    const isInWishList = (id) => {
        return wishList.some(wishListItem => wishListItem.id == id);
    }

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishList));
    }, [wishList]);

    return (
        <WishListContext.Provider value={{wishList, updateItemWishList, isInWishList, removeItemWishList}}>
            {children}
        </WishListContext.Provider>
    )
}

export default WishListProvider;