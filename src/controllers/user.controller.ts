import myDataSource from "../app-data-source";
import {User} from "../entities/user";

const userRepository = myDataSource.manager.getRepository(User)

export const getUserById = async (req, res) => {
    await userRepository.findOneBy({
        id: req.params.id
    }).then(value => {
        if (value) {
            res.status(200).send(value);
        } else {
            res.status(200).send([]);
        }
    }).catch(err => {
        res.status(500).send('invalid id!');
    });
}

export const addUser = async (req, res) => {

    if(req.body.profile_pic && req.body.username){
        await myDataSource.createQueryBuilder()
            .insert()
            .into(User)
            .values({
                username: req.body.username,
                profile_pic: req.body.profile_pic,
                date_created: new Date(),
                date_updated: new Date(),
            })
            .execute()
            .then(result => {
                res.status(201).send('user successfully created!')
            })
            .catch(error => {
                res.status(500).send('user creation failed!')
            })
    }else{
        res.status(500).send('user creation failed!, no data passed')
    }

}

export const deleteUser = async (req, res) => {
    await userRepository.delete({
        id: req.params.id
    }).then(value => {
        if (value.affected) {
            res.status(200).send(`successfully deleted user ${req.params.id}`);
        } else {
            res.status(500).send('no such id');
        }
    }).catch(err => {
        res.status(500).send('invalid id!');
    });
}

export const getAllUsers = async (req, res) => {
    const users = await userRepository.find();
    res.status(200).send(users);
}