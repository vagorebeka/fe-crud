import { useState, useEffect } from "react";
import FormInput from "./FormInput";

function MovieForm(props) {
    const { onSuccess, editableId = 0, resetEditable } = props;
    const [title, setTitle] = useState("");
    const [length, setLength] = useState("");
    const [rating, setRating] = useState("");
    const [category, setCategory] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (editableId === 0) {
            formReset();
        } else {
            fetch(`https://retoolapi.dev/ZZ9shj/movies/${editableId}`, {
                headers: {
                    Accept: "application/json",
                },
            }).then(async (response) => {
                const data = await response.json();
                if (response.status !== 200) {
                    //alert(data.message);
                } else {
                    setTitle(data.title);
                    setLength(data.length);
                    setRating(data.rating);
                    setCategory(data.category);
                    //setErrorMessage("");
                }
            });
        }
    }, [editableId]);

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
                /*setTitle();
                setLength();
                setRating();
                setCategory();
                setErrorMessage("");*/
                formReset();
            } else if (response.status === "404") {
                setErrorMessage("Page not found");
            } else {
                const jsonData = await response.json();
                const errorMessage = jsonData.message;
                setErrorMessage(errorMessage);
            }
        });
    };

    const editMovie = () => {
        const movie = {
            title: title,
            length: length,
            rating: rating,
            category: category,
        };
        fetch(`https://retoolapi.dev/ZZ9shj/movies/${editableId}`, {
            method: "PUT",
            body: JSON.stringify(movie),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then(async (response) => {
            if (response.status === 200) {
                onSuccess();
                resetEditable();
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
        setErrorMessage("");
    };

    return (<section id="add" className="mt-3">
        {editableId === 0 ? (
            <h2>Add new movie</h2>
        ) : (
            <h2>Edit {title}</h2>
        )}
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
            if (editableId === 0) {
                addMovie();
            } else {
                editMovie();
            }
        }}>
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
            {editableId === 0 ? (
                <button className="btn btn-success" type="submit">
                    Add
                </button>
            ) : (
                <button className="btn btn-warning" type="submit">
                    Edit
                </button>
            )}
            <button
              className="btn btn-danger"
              type="reset"
              onClick={() => {
                formReset();
                resetEditable();
              }}
            >
              Reset form
            </button>
        </form>
    </section>);
}

export default MovieForm;