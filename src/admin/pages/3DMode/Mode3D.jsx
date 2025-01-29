import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import AddProducts from '../Products/AddProducts';
import './Mode3D.css';

const Mode3D = () => {

    // image for add products
    const [image, setImage] = useState([]);

    // canvasRef
    const canvasRef = useRef(null);
    const imageRef = useRef(new Image());
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
    const [coordinates, setCoordinates] = useState({ x: [], y: [] });
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [stockedImage, setStockedImage] = useState(null);
    const [stocked, setStocked] = useState([]);
    const [currentImageId, setCurrentImageId] = useState(null);

    // Get stocked
    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(import.meta.env.VITE_API + `/store/1/stocked`, requestOptions)
            .then((response) => response.json())
            .then((result) => setStocked(result))
            .catch((error) => console.error(error));
    }, []);

    // Get stocked images
    const handleStocked = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: import.meta.env.VITE_API + `/store/stocked/${id}/images`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                setCurrentImageIndex(0);
                setStockedImage(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // Get images
    useEffect(() => {
        if (stockedImage && stockedImage.length > 0) {
            const imageUrls = stockedImage.map(img => img.image);
            setCurrentImageId(stockedImage[currentImageIndex].id);

            const img = imageRef.current;
            img.crossOrigin = "anonymous";
            img.src = imageUrls[currentImageIndex];
            img.onload = () => {
                drawCanvas();
            };
        }
    }, [stockedImage, currentImageIndex]);

    // Capture selected area
    const captureSelectedArea = useCallback((x, y) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const width = Math.abs(x[1] - x[0]);
        const height = Math.abs(y[1] - y[0]);

        if (width <= 0 || height <= 0) return;

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width;
        tempCanvas.height = height;
        const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });

        try {
            const imageData = ctx.getImageData(x[0], y[0], width, height);
            tempCtx.putImageData(imageData, 0, 0);
            const dataURL = tempCanvas.toDataURL('image/png');
            setImage([{ imagePreview: dataURL }]);
            setIsPopupOpen(true);
        } catch (error) {
            console.error('Error capturing area:', error);
        }
    }, []);

    // Draw canvas
    const drawCanvas = useCallback(() => {
        if (!stockedImage || stockedImage.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const img = imageRef.current;

        
        const FIXED_WIDTH = 990;
        const FIXED_HEIGHT = 490;
        
        // รักษาอัตราส่วนของ canvas
        const containerWidth = canvas.parentElement.clientWidth - 120; // หักpadding 60px ทั้งสองข้าง
        const containerHeight = canvas.parentElement.clientHeight;
        
        const scale = Math.min(
            containerWidth / FIXED_WIDTH,
            containerHeight / FIXED_HEIGHT
        );
        
        canvas.width = FIXED_WIDTH;
        canvas.height = FIXED_HEIGHT;
        
        // กำหนดขนาดที่แสดงผลจริงผ่าน CSS
        canvas.style.width = `${FIXED_WIDTH * scale}px`;
        canvas.style.height = `${FIXED_HEIGHT * scale}px`;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, FIXED_WIDTH, FIXED_HEIGHT);

        if (isDrawing) {
            const x = Math.min(
                Math.max(0, Math.min(startPoint.x, endPoint.x)),
                canvas.width
            );
            const y = Math.min(
                Math.max(0, Math.min(startPoint.y, endPoint.y)),
                canvas.height
            );
            const width = Math.min(
                Math.abs(startPoint.x - endPoint.x),
                canvas.width - x
            );
            const height = Math.min(
                Math.abs(startPoint.y - endPoint.y),
                canvas.height - y
            );

            if (width > 0 && height > 0) {
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                ctx.strokeRect(x, y, width, height);
            }
        }
    }, [isDrawing, startPoint, endPoint, stockedImage]);

    // Get mouse position
    const getMousePosition = useCallback((e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        
        // คำนวณ scale จากขนาดที่แสดงผลจริงเทียบกับขนาด canvas จริง
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }, []);

    // Handle mouse down
    const handleMouseDown = useCallback((e) => {
        if (!stockedImage || stockedImage.length === 0) return;

        const { x, y } = getMousePosition(e);
        
        // Reset if already drawing
        if (isDrawing) {
            setIsDrawing(false);
            setStartPoint({ x: 0, y: 0 });
            setEndPoint({ x: 0, y: 0 });
            drawCanvas();
            return;
        }

        setIsDrawing(true);
        setStartPoint({ x, y });
        setEndPoint({ x, y });
    }, [getMousePosition, stockedImage, isDrawing, drawCanvas]);

    // Handle mouse up
    const handleMouseUp = useCallback(() => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const width = Math.abs(endPoint.x - startPoint.x);
        const height = Math.abs(endPoint.y - startPoint.y);

        // Only capture if actually drew something (not just a click)
        if (width > 5 && height > 5) {
            const finalStartX = Math.max(0, Math.min(startPoint.x, canvas.width));
            const finalStartY = Math.max(0, Math.min(startPoint.y, canvas.height));
            const finalEndX = Math.max(0, Math.min(endPoint.x, canvas.width));
            const finalEndY = Math.max(0, Math.min(endPoint.y, canvas.height));

            const sortedX = [finalStartX, finalEndX].sort((a, b) => a - b);
            const sortedY = [finalStartY, finalEndY].sort((a, b) => a - b);

            setCoordinates({ x: sortedX, y: sortedY });
            setTimeout(() => {
                captureSelectedArea(sortedX, sortedY);
            }, 0);
        }

        setIsDrawing(false);
        drawCanvas();
    }, [startPoint, endPoint, isDrawing, captureSelectedArea, drawCanvas]);

    // Add mouse move event to window
    useEffect(() => {
        const handleGlobalMouseMove = (e) => {
            if (isDrawing) {
                const canvas = canvasRef.current;
                const rect = canvas.getBoundingClientRect();
                const scaleX = canvas.width / rect.width;
                const scaleY = canvas.height / rect.height;

                const x = (e.clientX - rect.left) * scaleX;
                const y = (e.clientY - rect.top) * scaleY;

                setEndPoint({ x, y });
                drawCanvas();
            }
        };

        const handleGlobalMouseUp = () => {
            if (isDrawing) {
                handleMouseUp();
            }
        };

        window.addEventListener('mousemove', handleGlobalMouseMove);
        window.addEventListener('mouseup', handleGlobalMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [isDrawing, drawCanvas, handleMouseUp]);

    // Next image
    const nextImage = useCallback(() => {
        if (stockedImage && stockedImage.length > 0) {
            setCurrentImageIndex((prev) => {
                const newIndex = (prev + 1) % stockedImage.length;
                setCurrentImageId(stockedImage[newIndex].id);
                return newIndex;
            });
        }
    }, [stockedImage]);

    // Previous image
    const prevImage = useCallback(() => {
        if (stockedImage && stockedImage.length > 0) {
            setCurrentImageIndex((prev) => {
                const newIndex = (prev - 1 + stockedImage.length) % stockedImage.length;
                setCurrentImageId(stockedImage[newIndex].id);
                return newIndex;
            });
        }
    }, [stockedImage]);


    return (
        <div className="mode3d-container">
            <div className="slider-container">
                <button className="slider-button prev">
                    <FaChevronLeft
                        onClick={prevImage}
                    />
                </button>

                <div className="slider-content">
                    <canvas
                        ref={canvasRef}
                        onMouseDown={handleMouseDown}
                    />
                </div>

                <button className="slider-button next">
                    <FaChevronRight
                        onClick={nextImage}
                    />
                </button>
                {isPopupOpen && stockedImage && stockedImage.length > 0 && (
                    <AddProducts
                        imagePreview={image[0]?.imagePreview}
                        onClose={() => setIsPopupOpen(false)}
                        onSave={(data) => {
                            console.log('Saved product:', data);
                            setIsPopupOpen(false);
                        }}
                        coordinatesX={coordinates.x}
                        coordinatesY={coordinates.y}
                        currentImageId={currentImageId}
                        storeId={1}
                    />
                )}
            </div>
            <div className="text-indicators"
            >{stocked.length > 0 && stocked.map((item) => (
                <div
                    className="text-indicator" key={item.id}
                    onClick={() => handleStocked(item.id)}
                >
                    <div className="indicator-dot"></div>
                    <div className="indicator-text-container">
                        <span className="indicator-text">{item.point_view}</span>
                        <button
                            className="edit-button"
                        >
                            ✏️
                        </button>
                    </div>
                </div>))}
            </div>
        </div>

    );
};

export default Mode3D;
