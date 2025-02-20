const Photo = require('../models/Photo');
const mongoose = require('mongoose');
const User = require('../models/User');

//Insert a photo with an user related to it
const insertPhoto = async (req, res) => {
    const {id} = req.params;
    const { title } = req.body;
    const image = req.file.filename;
    const user = await User.findById(id);
    
    //Create a new photo
    const photo = new Photo({
        title,
        imagePath: image,
        userId: user._id,
        userName: user.name
    });

    //If photo was created successfully, save it
    try {
        if(!photo) return res.status(400).json({errors: ["Não foi possível criar a foto!"]});
        await photo.save();
        res.status(201).json(photo);

    } catch (error) {
        res.status(400).json({errors: ["Não foi possível criar a foto!"]});
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {response} - Returns a response with a message and the id of the photo deleted
 */
const deletePhoto = async (req, res) => {
    const { id } = req.params;

    try {
        const photo = await Photo.findById(id);
 
        //Check if photo exists
        if(!photo) return res.status(404).json({errors: ["Foto não encontrada!"]});

        //Check if user is the owner of the photo
        if(!photo.userId.equals(req.user._id)) return res.status(422).json({errors: ["Você não tem permissão para deletar essa foto!"]});

        await Photo.findByIdAndDelete(photo._id);
        res.status(200).json({id: photo._id, message: "Foto removida com sucesso!"});
    } catch (error) {
        res.status(400).json({errors: ["Não foi possível deletar a foto!"]});
    }
}

//Get all photos
const getPhotos = async (req, res) => {
    try {
        const photos = await Photo.find().sort({createdAt: -1});
        res.status(200).json(photos);
    } catch (error) {
        res.status(400).json({errors: ["Não foi possível buscar as fotos!"]});
    }
}

//Get photos by user 
const getPhotosByUser = async (req, res) => {
    const { id } = req.params;

    try {  
        const photosByUser = await Photo.find({userId: id});
        res.status(200).json(photosByUser);
    } catch (error) {
        res.status(400).json({errors: [`Não foi possível buscar as fotos do usuário.`]});
    }
}

///Get phot by id
const getPhotoById = async (req, res) => {
    const { id } = req.params;

    try {
        const photo = await Photo.findById(id);
        if(!photo) return res.status(404).json({errors: ["Foto não encontrada!]"]});
        res.status(200).json(photo);
    } catch (error) {
        res.status(400).json({errors: ["Não foi possível buscar a foto!"]});
    }
}

//Update photo
const updatePhoto = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    try {
        const photo = await Photo.findById(id);
        //Check if photo exists
        if(!photo) return res.status(404).json({errors: ["Foto não encontrada!"]});

        //Check if user is the owner of the photo
        if(!photo.userId.equals(req.user._id)) return res.status(422).json({errors: ["Você não tem permissão para editar essa foto!"]});

        if(title) photo.title = title;
        await photo.save();
        res.status(200).json(photo);
    } catch (error) {
        res.status(400).json({errors: ["Não foi possível editar a foto!"]});
    }
}

//Like a photo
const likePhoto = async (req, res) => {
    const { id } = req.params;

    try {
        const photo = await Photo.findById(id);
        if(!photo) return res.status(404).json({errors: ["Foto não encontrada!"]});

        //Check if user already liked the photo
        if(photo.likes.includes(req.user._id)) return res.status(422).json({errors: ["Você já curtiu essa foto!"]});
      
        photo.likes.push(req.user._id);       

        await photo.save();
        res.status(200).json({photoId: id, userId: req.user._id, message: "Foto curtida com sucesso!"});
    } catch (error) {
        res.status(400).json({errors: ["Não foi possível curtir a foto!"]});
    }
}

//Comment a photo
const commentPhoto = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    try {
        const photo = await Photo.findById(id);
        if(!photo) return res.status(404).json({errors: ["Foto não encontrada!"]});

        photo.comments.push({comment, userId: req.user._id});
        await photo.save();
        res.status(200).json({photoId: id, userId: req.user._id, message: "Comentário adicionado com sucesso!"});
    } catch (error) {
        res.status(400).json({errors: ["Não foi possível adicionar o comentário!"]});
    }
}

//Get Photo from Title contains a string
const searchPhoto = async (req, res) => {
    const { q } = req.query;

    try {
        const photos = await Photo.find({title: new RegExp(q, 'i')});
        if(!photos) return res.status(404).json({errors: ["Nenhuma foto encontrada!"]});
        res.status(200).json(photos);
    } catch (error) {
        res.status(400).json({errors: ["Não foi possível buscar as fotos!"]});
    }
}

module.exports = { 
    insertPhoto,
    deletePhoto,
    getPhotos,
    getPhotosByUser,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhoto
};
