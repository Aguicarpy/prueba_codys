
//Consultas SQL directas para utilizar con el manager de TypeOrm
export const createForm = `
    INSERT INTO form(profile, fullname, email, phone, birthday) VALUES (?, ?, ?, ?, ?)
`
export const getForm = `SELECT * FROM form;`

export const updateForm = `
UPDATE form
SET profile = ?, fullname = ?, email = ?, phone = ?, birthday = ?
WHERE id = ?;
`
export const deleteForm = `
    DELETE FROM form WHERE id = ?
`
