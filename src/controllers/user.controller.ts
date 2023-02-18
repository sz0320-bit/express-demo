
export const getUserById = (req, res) => {
    res.send(req.params.id)
}

export const updateUser = (req, res) => {
    res.send('updated')
}

export const deleteUser = (req, res) => {
    res.send('deleted')
}