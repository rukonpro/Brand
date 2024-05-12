import axios from "axios";
import toast from "react-hot-toast";

const uploadImage =async img => {
   try {
       let body = new FormData()
       body.set('key', '518904f9fbbbab10c862cd2d81c9e6d9')
       body.append('image', img)

       return await axios({
           method: 'post',
           url: 'https://api.imgbb.com/1/upload',
           data: body
       });
   }
   catch (error){
       toast.error(error.massage)
   }
};
export default (uploadImage)