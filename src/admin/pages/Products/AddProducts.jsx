import React, { useState } from 'react';
import axios from 'axios';
import { CiCamera } from 'react-icons/ci';
import './stylesheets/Addproducts.css';

const AddProducts = ({ onClose, onSave, imagePreview, coordinatesX, coordinatesY, currentImageId, storeId }) => {
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        description: '',
        coordinates: {
            x: coordinatesX,
            y: coordinatesY
        },
        sizes: [],
        colors: [],
        imagePreview: imagePreview
    });

    const [newSize, setNewSize] = useState('');
    const [newColor, setNewColor] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Add size
    const handleAddSize = () => {
        if (newSize && !productData.sizes.includes(newSize)) {
            setProductData(prev => ({
                ...prev,
                sizes: [...prev.sizes, newSize]
            }));
            setNewSize('');
        }
    };

    // Remove size
    const handleRemoveSize = (sizeToRemove) => {
        setProductData(prev => ({
            ...prev,
            sizes: prev.sizes.filter(size => size !== sizeToRemove)
        }));
    };

    // Add color
    const handleAddColor = () => {
        if (newColor && !productData.colors.includes(newColor)) {
            setProductData(prev => ({
                ...prev,
                colors: [...prev.colors, newColor]
            }));
            setNewColor('');
        }
    };

    // Remove color
    const handleRemoveColor = (colorToRemove) => {
        setProductData(prev => ({
            ...prev,
            colors: prev.colors.filter(color => color !== colorToRemove)
        }));
    };

    // Handle overlay click
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProductData(prev => ({ ...prev, imagePreview: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Convert base64 to blob
    const base64ToBlob = (base64) => {
        const parts = base64.split(';base64,');
        const contentType = parts[0].split(':')[1];
        const raw = window.atob(parts[1]);
        const rawLength = raw.length;
        const uInt8Array = new Uint8Array(rawLength);

        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    };

    // Submit product
    const handleSubmit = async () => {
        try {
            setIsLoading(true);

            if (!productData.name || !productData.price || !productData.description) {
                alert('Please fill in all required fields');
                return;
            }

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const productPayload = {
                goods_set: [{
                    name: productData.name,
                    description: productData.description,
                    price: parseFloat(productData.price),
                    category: "Category Name",
                    x_axis: coordinatesX.map(coord => parseFloat(coord.toFixed(3))),
                    y_axis: coordinatesY.map(coord => parseFloat(coord.toFixed(3))),
                    sizes: productData.sizes,
                    colors: productData.colors,
                    images: [productData.imagePreview]
                }]
            };

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(productPayload),
                redirect: "follow"
            };

            const response = await fetch(
                `${import.meta.env.VITE_API}/store/1/stocked-image/${currentImageId}/goods`,
                requestOptions
            );

            if (response.ok) {
                const result = await response.text();
                onSave(result);
                onClose();
            } else {
                throw new Error('Failed to add product');
            }

        } catch (error) {
            console.error('Error details:', error);
            alert('Failed to add product. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="add-products-container" onClick={e => e.stopPropagation()}>
                <div className='product-image'>
                    {productData.imagePreview && (
                        <img
                            src={productData.imagePreview}
                            alt="preview"
                        />
                    )}
                    <input
                        type="file"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        accept="image/*"
                    />
                    <CiCamera
                        className="camera-icon"
                        onClick={() => document.querySelector('input[type="file"]').click()}
                    />
                </div>

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={productData.name}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Product Price"
                    value={productData.price}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={productData.description}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                />

                <input
                    type="text"
                    value={coordinatesX.map(coord => coord.toFixed(3)).join(", ")}
                    readOnly
                    className="input-field"
                />

                <input
                    type="text"
                    value={coordinatesY.map(coord => coord.toFixed(3)).join(", ")}
                    readOnly
                    className="input-field"
                />

                <div className="sizes-container">
                    <div className="tags-container">
                        {productData.sizes.map((size) => (
                            <span key={size} className="tag">
                                {size}
                                <button onClick={() => handleRemoveSize(size)} className="remove-tag">×</button>
                            </span>
                        ))}
                    </div>
                    <div className="add-tag-container">
                        <input
                            type="text"
                            placeholder="Add Sizes..."
                            value={newSize}
                            onChange={(e) => setNewSize(e.target.value)}
                            className="input-field"
                        />
                        <button onClick={handleAddSize} className="add-button">Add</button>
                    </div>
                </div>

                <div className="colors-container">
                    <div className="tags-container">
                        {productData.colors.map((color) => (
                            <span key={color} className="tag">
                                {color}
                                <button onClick={() => handleRemoveColor(color)} className="remove-tag">×</button>
                            </span>
                        ))}
                    </div>
                    <div className="add-tag-container">
                        <input
                            type="text"
                            placeholder="Add Colors..."
                            value={newColor}
                            onChange={(e) => setNewColor(e.target.value)}
                            className="input-field"
                        />
                        <button onClick={handleAddColor} className="add-button">Add</button>
                    </div>
                </div>

                <div className="button-container">
                    <button onClick={onClose} className="cancel-button" disabled={isLoading}>
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="save-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProducts;
