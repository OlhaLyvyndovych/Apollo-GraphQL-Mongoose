const Post = require('./models/Post.model');
const resolvers = {
    Query: {
      hello: () => {
        return 'Just work properly!!!'
      },
      getAllPosts: async () => {
        return await Post.find();   
      },
      getPost: async (_, {id}, context, info) => {
        return await Post.findById(id);
      }
    },
    Mutation: {
        createPost: async (_, args, context, info) => {
          const {title, description} = args.post;
          const post = new Post({ title, description });
          await post.save();
          return post;
        },
        deletePost: async (_parent, args, _context, _info) => {
          const { id } = args;
          await Post.findByIdAndDelete(id);
          return "Ok, the post has been deleted..";
         },
        updatePost: async (_parent, args, _context, _info) => {
          const { title, description} = args.post;
          const updates = {};
          if (title !== undefined) {
            updates.title = title
          }
          if (description !== undefined) {
            updates.description = description
          }

          const { id } = args;
          
          const post = await Post.findByIdAndUpdate(id, { updates }, { new: true });
          return post;
        }
    }
  };

  module.exports = resolvers; 