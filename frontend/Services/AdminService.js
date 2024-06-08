const getAllGroups = async () => {
    return await fetch(`http://158.180.14.4:3000/admin/groups`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

const setActive = async (groep) => {
    return await fetch(`http://158.180.14.4:3000/admin/activate/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({groep})
    })

}

const createGroep = async (groep) => {
    return await fetch(`http://158.180.14.4:3000/admin/create/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({groep})
    })


}

const deleteGroep = async (groep) => {
    return await fetch(`http://158.180.14.4:3000/admin/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({groep})
    })


}

const generateStatistics = async (groep) => {
    return await fetch(`http://158.180.14.4:3000/admin/statistics/${groep}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

const getActive = async () => {
    console.log(`http://158.180.14.4:3000/admin/activegroep`)
    return await fetch(`http://158.180.14.4:3000/admin/activegroep`, {
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