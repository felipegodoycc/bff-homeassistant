import { User } from "../types/user";

const users: User[] = [
    {
        id: 1,
        username: "felipe.godoy",
        password: "clave123",
        name: "Felipe",
        lastname: "Godoy",
        rut: "19.140.856-K",
        address: "Traslavina 1777",
        city: "Pedro Aguirre Cerda",
        medicines: [
            "Desloratadina",
            "Paracetamol"
        ],
        diseases: [
            "Resistencia a la insulina",
        ]
    },
    {
        id: 2,
        username: "pedro.perez",
        password: "clave123",
        name: "Pedro",
        lastname: "Perez",
        rut: "19.526.448-1",
        address: "Los pioneros 56",
        city: "La Florida",
        medicines: [
            "Brexotide",
            "Glimepirida"
        ],
        diseases: [
            "Asma",
            "Diabetes"
        ]
    }

]

export default users