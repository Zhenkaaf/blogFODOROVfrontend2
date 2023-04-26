import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import './profile.css';
import Post from '../../components/post/Post';
import { LoginSuccess } from '../../context/Actions';
import { uploadFileToFirebase } from '../../uploadToFirebase/uploadFileToFirebase';
import {LoadingSpinner} from '../../loadingSpinner/LoadingSpinner';





const Profile = () => {
    const { dispatch, isFetching, user } = useContext(Context);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [myPosts, setMyPosts] = useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    console.log(file);



    useEffect(() => {
        setLoading(true);
        const fetchPersonalPosts = async () => {
            try {
                let personalPosts = await axios.get(`https://zany-jade-chipmunk-cape.cyclic.app/posts/email/${user.userEmail}`);
                /*  let personalPosts = await axios.get(`http://localhost:8001/posts/email/${user.userEmail}`); */
                console.log('myPosts===', personalPosts.data);
                const sortedPosts = personalPosts.data.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                console.log('sorted===', sortedPosts);
                setMyPosts(sortedPosts);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPersonalPosts();

    }, [user]);


    useEffect(() => {
        if (file) {
            updProfilePhoto();
        }
    }, [file]);

    const updProfilePhoto = async (e) => {
        setLoading(true);
        if (file) {

            try {
                let downloadURL = await uploadFileToFirebase(file, 'avatars');
                try {
                    const res = await axios.put('https://zany-jade-chipmunk-cape.cyclic.app/auth/profile', {
                        /* const res = await axios.put('http://localhost:8001/auth/profile', { */
                        ...user,
                        userphotoURL: downloadURL,
                    });
                    console.log('dispatch**********', res.data);
                    dispatch(LoginSuccess(res.data));
                } catch (err) {
                    console.error('front error===', err.response.data);
                    throw err;
                }
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        }
        setLoading(false);
    };


    const delPost = async (e) => {
        let id = e.target.getAttribute('data-id');
        try {
            /* await axios.delete(`http://localhost:8001/posts/${id}`); */
            await axios.delete(`https://zany-jade-chipmunk-cape.cyclic.app/posts/${id}`);
            const updatedPosts = myPosts.filter(post => post._id !== id);
            setMyPosts(updatedPosts);

        } catch (err) {
            console.error(err);
        }
    }



    return (
        <div className="profile">
            <div className="profile__wrapper">
                <div className="profile__settings settings">

                    <h1 className="settings__title">Hello {user.userName} !</h1>
                    <div className="settingsPP">
                        {/* loading ? (<LoadingSpinner />) : ( */<img src={user.userPhoto ? user.userPhoto : 'https://photoshablon.com/_ph/44/193521795.jpg'} alt="" />/* ) */}
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon fa-regular fa-circle-user"></i>
                        </label>
                        <input type="file" id='fileInput' style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
                    </div>



                </div>
                <div className="profile__posts">
                    <h1 className="profile__posts-title">My posts:</h1>
                    {loading ? (<LoadingSpinner />) : (myPosts?.map(post => (
                        <Post post={post} key={post._id} delPost={delPost} />
                    )))}
                    
                </div>
            </div>
        </div>
    )
}
export default Profile;

/* const updd = async (e) => {

    if (file) {
        
        const filename = Date.now() + file.name;
       
        const storageRef = ref(storage, 'avatars/' + filename);
       
        const uploadTask = uploadBytesResumable(storageRef, file);
       
        console.log('uploadTask*****', uploadTask);
        uploadTask.on(

            (error) => {
                console.error(error);
            },
           
            async () => {
                console.log('3'); */
/* getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => { */
/*  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
 console.log('File available at', downloadURL);
 
    
     try {
         console.log('starttt'); */
/* const res = await axios.put('https://zany-jade-chipmunk-cape.cyclic.app/auth/profile', { */
/* const res = await axios.put('http://localhost:8001/auth/profile', {
    ...user,
    userphotoURL: downloadURL,
});
console.log('dispatch**********', res.data);
dispatch(LoginSuccess(res.data));

} catch (err) {
console.error('front error===', err.response.data);

} */

/*  }); */
/*  }
 
);
}
} */


/*     const { user, dispatch } = useContext(Context);
   const [file, setFile] = useState(null);
  
   
   const [password, setPassword] = useState('');
   const [success, setSuccess] = useState(false);
 
   const PF = 'http://localhost:5000/images/';
 
   const handleSubmit = async (e) => {
       e.preventDefault();
       dispatch({type: 'UPDATE_START'});
       const updatedUser = {
           userId: user._id,
           username,
           email,
           password,
       };
       if (file) {
           const data = new FormData();
           const filename = Date.now() + file.name;
           data.append('name', filename);
           data.append('file', file);
           updatedUser.profilePic = filename;
           try {
               await axios.post('/upload', data);
           } catch (err) {
               console.error(err);
           }
       }
       try {
           const res = await axios.put('/users/' + user._id, updatedUser);
           setSuccess(true);
           dispatch({type: 'UPDATE_SUCCESS', payload: res.data});
       } catch (err) {
           console.error(err);
           dispatch({type: 'UPDATE_FAILURE'});
       }
   }; */





{/* <form action="" className="settingsForm" onSubmit={handleSubmit}>
                        
                        <label htmlFor="">Username</label>
                        <input type="text" placeholder={user.userName} onChange={e => setUsername(e.target.value)} />

                        <label htmlFor="">Email</label>
                        <input type="text" placeholder={user.userEmail} onChange={e => setEmail(e.target.value)} />

                        <label htmlFor="">Password</label>
                        <input type="password" onChange={e => setPassword(e.target.value)} />

                        <button className="settingsSubmit" type='submit'>Update</button>
                           {success && <span style={{color: 'green', textAlign: 'center', marginTop: '10px'}}>User has been updated!</span>}
                    </form> */}









/*  const upd = async (e) => {
     setLoading(true);
     if (file) {
         const filename = `${Date.now()}${file.name}`;
         const storageRef = ref(storage, `avatars/${filename}`);
         console.log('storageRef***', storageRef);
 
         const uploadTask = uploadBytesResumable(storageRef, file);
         console.log('uploadTask***', uploadTask);
 
         try {
             await uploadTask;
             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
             console.log('File available at', downloadURL);
 
             const res = await axios.put('https://zany-jade-chipmunk-cape.cyclic.app/auth/profile', {
                
                 ...user,
                 userphotoURL: downloadURL,
             });
             console.log('dispatch**********', res.data);
             dispatch(LoginSuccess(res.data));
         } catch (err) {
             console.error(err);
             setLoading(false);
         }
     }
     setLoading(false);
 }; */