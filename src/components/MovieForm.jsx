import { useState } from "react";
import FormInput from "./FormInput";

function MovieForm(props) {
    const { onSuccess } = props;
    const [title, setTitle] = useState("");
    const [length, setLength] = useState("");
    const [rating, setRating] = useState("");
    const [category, setCategory] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const addMovie = () => {
        const movie = {
            title: title,
            length: length,
            rating: rating,
            category: category,
        };
        fetch("https://retoolapi.dev/ZZ9shj/movies", {
            method: "POST",
            body: JSON.stringify(movie),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then(async (response) => {
            if (response.status === 201) {
                onSuccess();
                setTitle();
                setLength();
                setRating();
                setRating();
                setErrorMessage("");
            } else if (response.status === "404") {
                setErrorMessage("Page not found");
            } else {
                const jsonData = await response.json();
                const errorMessage = jsonData.message;
                setErrorMessage(errorMessage);
            }
        });
    };

    const formReset = () => {
        setTitle("");
        setLength("");
        setRating("");
        setCategory("");
    };

    return (<section id="add">
        <h2>Add new movie</h2>
        {errorMessage !== "" ? (
            <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
            >
                {errorMessage}
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                ></button>
            </div>
        ) : ("")}
        <form onSubmit={(event) => {
          event.preventDefault();
          addMovie();}}>
            <FormInput
                inputId={"titleInput"}
                inputLabel={"Title"}
                value={title}
                setValue={setTitle}
            />
            <FormInput
                inputId={"lengthInput"}
                inputLabel={"Length"}
                inputType="number"
                value={length}
                setValue={setLength}
            />
            <FormInput
                inputId={"ratingInput"}
                inputLabel={"Rating"}
                inputType="number"
                value={rating}
                setValue={setRating}
            />
            <FormInput
                inputId={"categoryInput"}
                inputLabel={"Category"}
                value={category}
                setValue={setCategory}
            />
            <button className="btn btn-success" type="submit">
                Add movie
            </button>
        </form>
    </section>);
}

export default MovieForm;