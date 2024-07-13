import { useState, useEffect, useRef } from 'react'
import { Icon } from '../assets/icon/icons';
import { useDebounce } from '../ultils/customHook';
import { API, ImageUploadAPI, token } from '../config';
import { useNavigate } from 'react-router-dom';
import { toBase64 } from './function';

export function ModalEdit({ user, showEdit, setShowEdit }) {
    const navigate = useNavigate();

    const [isEditDisable, setIsEditDisable] = useState(true);
    const [usernameError, setUsernameError] = useState("");
    const [tempImageFile, setTempImageFile] = useState(null);
    const [profileNameError, setProfileNameError] = useState("");
    const imageInput = useRef();

    const [formData, setFormData] = useState({
        urlImage: user.urlImage || "",
        username: user.username || "",
        profileName: user.profileName || "",
        bio: user.bio || "",
    });
    useEffect(() => {
        let mounted = false;
        if (!mounted) {
            setFormData({
                urlImage: user.urlImage || "",
                username: user.username || "",
                profileName: user.profileName || "",
                bio: user.bio || "",
            });
        }

        return () => mounted = true;
    }, [user]);

    useEffect(() => {
        let mounted = false;
        if (!mounted) {
            setIsEditDisable(!(formData.urlImage != user.urlImage || formData.username != user.username ||
                formData.profileName != user.profileName || formData.bio != user.bio));
        }
        return () => mounted = true;
    }, [formData]);

    const validUsername = useDebounce(formData.username, 500);
    useEffect(() => {
        let mounted = false;
        if (!mounted) {
            if (formData.username != "" && formData.username != user.username) {
                const checkValid = async () => {
                    const result = await fetch(`${API}/func/api/usernameIsValid?newUsername=${validUsername}&currentUsername=${user.username}`, {
                        method: 'GET'
                    })
                    const data = await result.json();
                    if (result.status == 400) {
                        setUsernameError(data.message);
                        setIsEditDisable(true);
                    } else {
                        setUsernameError("");
                        setIsEditDisable(false);
                    }
                }
                checkValid();
            }
        }
        return () => mounted = true;
    }, [validUsername]);

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        if (files) {
            setTempImageFile([{ file: files[0] }]);
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData((prevData) => ({
                    ...prevData,
                    [id]: reader.result,
                }));
            }
            reader.readAsDataURL(files[0]);
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [id]: value,
            }));
        }
    }

    const maxChars = 255;

    const handleTextArea = (e) => {
        const { id, value } = e.target;
        if (value.length <= maxChars) {
            setFormData((prevData) => ({
                ...prevData,
                [id]: value,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [id]: value.substring(0, maxChars),
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let flag = false;
        const newData = {
            ...formData,
            usernameChangeHistory: user.usernameChangeHistory,
            profileNameChangeHistory: user.profileNameChangeHistory
        }
        if (formData.username != user.username) {
            const res = await fetch(`${API}/func/api/validate-username?userId=${user.userId}`, {
                method: "POST"
            })
            if (res.status == 400) {
                flag = true;
                setUsernameError(await res.json().then(data => data.message));
            } else {
                newData.usernameChangeHistory = [...user.usernameChangeHistory, { newUsername: formData.username }];
            }
        }
        if (formData.profileName != user.profileName) {
            const res = await fetch(`${API}/func/api/validate-profile-name?userId=${user.userId}`, {
                method: "POST"
            })
            if (res.status == 400) {
                flag = true;
                setProfileNameError(await res.json().then(data => data.message));
            } else {
                newData.profileNameChangeHistory = [...user.profileNameChangeHistory, { newProfileName: formData.profileName }];
            }
        }
        if (tempImageFile) {
            for (const media of tempImageFile) {
                const base64 = await toBase64(media.file);
                const formData = new FormData();
                formData.append('image', base64);

                try {
                    const response = await fetch(`https://api.imgbb.com/1/upload?key=${ImageUploadAPI}`, {
                        method: 'POST',
                        body: formData
                    });
                    const data = await response.json();
                    if (data.success) {
                        newData.urlImage = data.data.display_url;
                    } else {
                        console.error('Error uploading image:', data.error.message);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }
        if (!flag) {
            const res = await fetch(`${API}/user/profile/edit/${user.userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newData)
            })

            if (res.status == 401) {
                window.localStorage.clear();
                window.location.href = "/login"
            }
            if (res.status == 200) {
                window.location.reload();
            }
        }
    }

    return (
        <>
            <div id='edit-modal' className={`edit_layout ${showEdit ? "show" : ""}`}>
                <div className="edit_container">
                    <form className="edit_wrapper" onSubmit={handleSubmit}>
                        <div className="edit_header">
                            <h3 className="edit_header_title">
                                Edit profile
                            </h3>
                            <button className="closeModal" type='button' onClick={(e) => { setShowEdit(false); document.body.style.overflow = "auto"; }}>{Icon.Remove}</button>

                        </div>
                        <div className="edit_form">
                            {/* ================ row 1 ========================= */}
                            <div className="edit_form_row">
                                <div className="edit_form_col_1">
                                    <h3>Profile photo</h3>
                                </div>
                                <div className="edit_form_col_2">
                                    <div className="edit_form_col_2_image">
                                        <img src={formData.urlImage} alt="Avatar" />
                                        <button type='button' className="image_edit_btn" onClick={() => imageInput.current.click()}>
                                            {Icon.EditImage}
                                        </button>
                                        <input type="file" accept="image/*" id='urlImage' ref={imageInput} hidden onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="edit_form_col_1"></div>
                            </div>
                            {/* ================ row 2 ========================= */}
                            <div className="edit_form_row">
                                <div className="edit_form_col_1">
                                    <h3>Username</h3>
                                </div>
                                <div className="edit_form_col_2">
                                    <input type="text" name="username" placeholder='e.g. johndoe' onChange={handleChange} id='username' value={formData.username} />
                                    {usernameError != "" && (
                                        <p className="edit_form_col_2_note edit_form_col_2_error">
                                            {Icon.Error} {usernameError}
                                        </p>
                                    )}
                                    <p className='edit_form_col_2_url'>www.sufy.com/@{formData.username}</p>
                                    <p className="edit_form_col_2_note">
                                        Usernames can only contain letters, numbers, underscores, and
                                        periods. Changing your username will also change your profile link.
                                    </p>
                                    <p className="edit_form_col_2_note">
                                        You can only change username 2 times in 14 days.
                                    </p>
                                </div>
                                <div className="edit_form_col_1"></div>
                            </div>
                            {/* ================ row 3 ========================= */}
                            <div className="edit_form_row">
                                <div className="edit_form_col_1">
                                    <h3>Name</h3>
                                </div>
                                <div className="edit_form_col_2">
                                    <input type="text" name="name" placeholder='e.g. John Doe' id='profileName' onChange={handleChange} value={formData.profileName} />
                                    {profileNameError != "" && (
                                        <p className="edit_form_col_2_note edit_form_col_2_error">
                                            {Icon.Error} {profileNameError}
                                        </p>
                                    )}
                                    <p className="edit_form_col_2_note">
                                        Your nickname can only be changed once every 7 days.
                                    </p>
                                </div>
                                <div className="edit_form_col_1"></div>
                            </div>
                            {/* ================ row 4 ========================= */}
                            <div className="edit_form_row">
                                <div className="edit_form_col_1">
                                    <h3>Bio</h3>
                                </div>
                                <div className="edit_form_col_2">
                                    <textarea rows={5} cols={51} name="bio" placeholder='e.g. I love to travel' id='bio' onChange={handleTextArea} value={formData.bio}></textarea>
                                    <p className="edit_form_col_2_note">
                                        {formData.bio.length}/{maxChars}
                                    </p>
                                </div>
                                <div className="edit_form_col_1"></div>
                            </div>

                        </div>
                        <div className="edit_action_btn">
                            <button type="button" className='btn_cancel' onClick={() => { setShowEdit(false); document.body.style.overflow = "auto"; }}>Cancel</button>
                            <button type="submit" className={`btn_submit ${isEditDisable ? "disabled" : ""}`} disabled={isEditDisable}>Save</button>
                        </div>
                    </form>
                </div>
                <div className="edit_bg" onClick={() => { setShowEdit(false); document.body.style.overflow = "auto"; }}></div>
            </div>
        </>
    )

}