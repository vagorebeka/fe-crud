function MovieCard(props) {
    const { movie, afterDelete } = props;
    const { id, title, length, rating, category } = movie;
    const deleteMovie = () => {
        fetch(`https://retoolapi.dev/ZZ9shj/movies/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
            },
        }).then(async (response) => {
            if (response.status !== 204) {
                const data = await response.json();
                // alert(data.message);
                // TODO: fix undefined alert
            }
            afterDelete();
        });
    };
    return (<div className="col-md-6">
        <div className="card h-100">
            <div className="card-header">
                <h4 className="card-title">{title}</h4>
            </div>
            <div className="card-body">
                <table className="table table-hover">
                    <tbody>
                        <tr>
                            <th>Length</th>
                            <td>{length}</td>
                        </tr>
                        <tr>
                            <th>Rating</th>
                            <td>{rating}</td>
                        </tr>
                        <tr>
                            <th>Category</th>
                            <td>{category}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="card-footer">
                <div className="row row-cols-2">
                    <a href="#add" className="btn btn-secondary col">Edit</a>
                    <button className="btn btn-danger col" onClick={() => { deleteMovie(); }}>Delete</button>
                </div>
            </div>
        </div>
    </div>);
}

export default MovieCard;