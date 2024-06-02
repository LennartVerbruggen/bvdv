const getAllGroups = async () => {
    return await fetch(`${process.env.API_URL}/admin/groups`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

const setActive = async (groep) => {
    return await fetch(`${process.env.API_URL}/admin/activate/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({groep})
    })

}

const createGroep = async (groep) => {
    return await fetch(`${process.env.API_URL}/admin/create/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({groep})
    })


}

const deleteGroep = async (groep) => {
    return await fetch(`${process.env.API_URL}/admin/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({groep})
    })


}

const generateStatistics = async (groep) => {
    return await fetch(`${process.env.API_URL}/admin/statistics/${groep}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

const getActive = async () => {
    return await fetch(`${process.env.API_URL}/admin/activegroep`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

}

const AdminService = {
    getAllGroups, setActive, createGroep, deleteGroep, generateStatistics, getActive
}

export default AdminService