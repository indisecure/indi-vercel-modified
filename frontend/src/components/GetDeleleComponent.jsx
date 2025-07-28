import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"

function GetDeleteComponent() {
    const [cars, setCars] = useState([])
    const getAllCars = async () => {
        try {
            const response = await axios.get('/car')
            setCars(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllCars()
    }, [])

    const deleteCar = async (id) => {
        try {
            await axios.delete(`/car/${id}`)
            getAllCars()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="container">
            <h2 className="text-center">List Cars </h2>
            <Link to="/add"> <button className="btn btn-outline-success"> Add Car</button></Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th> Car Model </th>
                        <th> Car Color </th>
                        <th> Car Price </th>
                        <th> Date</th>
                        <th className="text-center"> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map(car => (
                        <tr key={car._id}>
                            <td>{car.model}</td>
                            <td>{car.color}</td>
                            <td>{car.price}</td>
                            <td>{new Date(car.createdAt).toLocaleString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: true,
                            })}</td>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <Link to={`/edit/${car._id}`}>
                                        <button className="btn btn-success"> Update</button>
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => deleteCar(car._id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default GetDeleteComponent
