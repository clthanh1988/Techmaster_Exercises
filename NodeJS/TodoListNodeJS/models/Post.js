import {
    sequelize,
    Op
} from '../databases/database';
import Sequelize from 'sequelize';

export const Post = sequelize.define('post', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: Sequelize.TEXT,
        content: Sequelize.TEXT,
        author: Sequelize.STRING,
        createdAt: {
            type: Sequelize.DATE,
            field: 'createdat'
          },
    
        updatedAt: {
            type: Sequelize.DATE,
            field: 'updatedat'
          }
    },

    {
        timestamps: true
    }
    // timestamps = false => Không tự động thêm createdAt & updatedAt
);
//controllers
export const createNewPost = async (title, content, author) => {
    try {
        const createdPost = await Post.create({
            title,
            content,
            author        
          },{
            fields: ["title", "content", 'author']
          });
          return createdPost ? createdPost : {};
    } catch (error) {
        return {};
    }    
}
export const getAllPosts = async () => {  
    try {
        const allPosts = await Post.findAll({
            attributes:["id" ,"title", "content", 'author', "createdAt", "updatedAt"]            
          });   
          return allPosts;
    } catch (error) {
        return [];
    }   
}
export const getPostById = async (id) => {    
      try {
        const post = await Post.findById(id);  

        return post.dataValues;
                   
    } catch (error) {
        return {};
    }   
}
export const updateById = async (params) => {    
    try {
        const updatedPost = await Post.findById(params.id);
        await updatedPost.update(params);    
        return updatedPost;
                 
    } catch (error) {
      return {};
  }   
}

export const deletePost = async (id) => {
    try {
        await Post.destroy({
            where: {
              id
            }
          });    
        return true;
                 
    } catch (error) {
      throw error;
  }  
} 