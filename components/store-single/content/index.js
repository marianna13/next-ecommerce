import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { some } from 'lodash';
import { addProduct } from './../../../store/actions/cartActions';
import { toggleFavProduct } from './../../../store/actions/userActions';
import { FiEdit } from "react-icons/fi";
import { useSession, getSession } from "next-auth/react";
import styles from '../../../assets/css/Home.module.scss';
import Map from '../../map';




const Content = ({ store}) => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();


  return (
    <section className="product-content">
      <div className="product-content__intro">
    
         <h2 className="product__name">{store.name}</h2>
          <div className="store__info">
         <p>{store.location.address}</p>
         <p>{store.email}</p>
         <p>{store.phone}</p>
        </div>
      </div>
      <Map location={store.location} zoomLevel={17} />
    </section>

  );
};
  
export default Content;
    