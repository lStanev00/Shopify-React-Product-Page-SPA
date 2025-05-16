import { useContext, useState } from "react";
import Style from "../Styles/ReviewModal.module.css";
import { svg } from "./svgs";
import { ContextVariables } from "../context-variables/ContextVariables";

export default function ReviewModal() {
    const { setTrigger, product, visitorId, url, fetchProduct } = useContext(ContextVariables);
    const [stars, setStars] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const showError = (msg) => {
        setErrorMessage(msg);
        setTimeout(() => setErrorMessage(""), 3000);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(files);
        setImagePreviews(files.map(file => URL.createObjectURL(file)));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !content || stars === 0) {
            showError("Please fill in all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("rating", stars);
        imageFiles.forEach(file => {
            formData.append("images", file);
        });

        try {
            const res = await fetch(url +  `/reviews/${product.id}`, {
                method: "POST",
                headers: {
                    "x-visitor-id": visitorId,
                },
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            console.log("Review submitted:", data);
            
            setTrigger(false);
            await fetchProduct();
        } catch (err) {
            showError("Could not submit review.");
        }
    };

    return (
        <>
            {errorMessage && (
                <div className={`${Style.errorBanner} ${Style.show}`}>
                    {errorMessage}
                </div>
            )}

            <div className={Style.reviewModal}>
                <button onClick={() => setTrigger(false)} className={Style.closeButton}>
                    ×
                </button>
                <h2 className={Style.modalTitle}>Leave a review</h2>

                <form className={Style.reviewForm} onSubmit={handleSubmit}>
                    <div className={Style.formGroup}>
                        <label>
                            Name<span className={Style.required}>*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your name"
                            className={Style.input}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className={Style.formGroup}>
                        <label>E-mail<span className={Style.required}>*</span></label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Enter your e-mail"
                            className={Style.input}
                        />
                    </div>

                    <div className={Style.formGroup}>
                        <label>Rating<span className={Style.required}>*</span></label>
                        <div className={Style.stars}>
                            {[...Array(stars)].map((_, index) => (
                                <div
                                    key={index}
                                    onClick={() => setStars(index + 1)}
                                    className={Style.star}>
                                    <svg.FullStar />
                                </div>
                            ))}
                            {[...Array(5 - stars)].map((_, index) => (
                                <div
                                    key={`empty-${index}`}
                                    onClick={() => setStars(stars + index + 1)}
                                    className={Style.star}>
                                    <svg.EmptyStar />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={Style.formGroup}>
                        <label>Review title</label>
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            placeholder="Enter review title"
                            className={Style.input}
                        />
                    </div>

                    <div className={Style.formGroup}>
                        <label>Review</label>
                        <textarea
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your review"
                            className={Style.textarea}
                            rows={4}></textarea>
                    </div>

                    <div className={Style.images}>
                        <label>Upload a photo of how it looks (optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            style={{ display: "none" }}
                            id="review-image"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="review-image" className={Style.uploadBox}>
                            📷
                        </label>
                        {imagePreviews.map((src, idx) => (
                            <img key={idx} src={src} alt={`Preview ${idx}`} className={Style.imagePreview} />
                        ))}
                    </div>

                    <button type="submit" className={Style.submitButton}>
                        Submit review
                    </button>
                </form>
            </div>
        </>
    );
}