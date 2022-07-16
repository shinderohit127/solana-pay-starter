import React from "react";
import styles from "../styles/Product.module.css";
import Buy from "./Buy";

export default function Product({ product }) {
    const {id, name, price, description, image_url } = product;
    return (
        <div className={styles.product_container}>
            <div>
                <img className={styles.prodcut_image} src={image_url} alt={name} height={105} width={105}/>
            </div>
            <div className={styles.product_details}>
                <div className={styles.product_text}>
                <div className={styles.product_title}>{name}</div>
                <div className={styles.product_description}>{description}</div>
                </div>

                <div className={styles.product_action}>
                <div className={styles.product_price}>{price} USDC</div>
                    <Buy itemID={id} />
                </div>
            </div>
        </div>
    )
}