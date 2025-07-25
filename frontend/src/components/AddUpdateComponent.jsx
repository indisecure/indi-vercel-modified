import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
function AddUpdateComponent() {
    const [model, setModel] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();

    const saveOrUpdate = async (e) => {
        e.preventDefault();
        if (!(model.trim() && color.trim())) {
            alert('Field is Empty');
            return;
        }
        if (price == 0) {
            alert('Price Can Not be Zero');
            return
        }
        const car = { model, color, price };
        try {
            if (id) {
                await axios.put(`/car/${id}`, car);
            }
            else {
                await axios.post('/car', car);
            }
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await axios.get(`/car/${id}`);
                setModel(response.data.model || '');
                setColor(response.data.color || '');
                setPrice(response.data.price || 0);
            } catch (error) {
                console.error('Error fetching todo:', error);
            }
        };
        if (id) {
            fetchCar();
        }
    }, [id]);

    return (
        <div className="container mt-5">
            <h3 className="text-primary mb-4 text-center">
                {id ? 'Update Car' : 'Add Car'}
            </h3>
            <form onSubmit={saveOrUpdate}>
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                placeholder="Enter your car model"
                            />
                            <input
                                type="text"
                                className="form-control"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                placeholder="Enter your car color"
                            />
                            <input
                                type="text"
                                className="form-control"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                placeholder="Enter your car price"
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-success">
                                Save
                            </button>
                            <Link to="/" className="btn btn-danger">
                                Cancel
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddUpdateComponent;



