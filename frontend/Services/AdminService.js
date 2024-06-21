const getAllGroups = async () => {
    return await fetch(`${process.env.API_URL}/admin/groups`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
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


const downloadExcel = async () => {
    return await fetch(`${process.env.API_URL}/admin/download-excel`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      });
}

const AdminService = {
    getAllGroups, createGroep, deleteGroep, generateStatistics, downloadExcel
}

export default AdminService