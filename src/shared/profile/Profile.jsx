import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Button,
  Stack,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ChangePassword from "components/account/ChangePassword";
import {
  handleEditProfile,
  handleSave,
  handleChangePasswordOpen,
  handleChangePasswordClose,
} from "./HandleProfile";
import { fetchUserInfo } from "api/user/userService";
import { handleFileChange } from "shared/utils/uploadFileUtils";
import DotLoader from "shared/component/loader/DotLoader";

const Profile = ({ open, handleClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userNote, setUserNote] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState("");
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userInfo = await fetchUserInfo();
        setName(userInfo.name || "");
        setEmail(userInfo.email || "");
        setUserNote(userInfo.contentMotivation || "");
        setImage(userInfo.avatar || "/header_user.png");
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (open) {
      loadUserInfo();
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      disableScrollLock
    >
      <DialogContent>
        <Stack
          direction="row"
          spacing={2}
          divider={<Box sx={{ width: 2, bgcolor: "grey.300" }} />}
        >
          <Stack
            spacing={1}
            alignItems="center"
            sx={{ width: "40%", justifyContent: "center" }}
          >
            <label htmlFor="upload-button">
              <input
                accept="image/*"
                id="upload-button"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, setImage)}
                disabled={!editMode}
              />
              <Button component="span" sx={{ p: 0 }}>
                <img
                  src={image}
                  alt="User"
                  style={{ width: 180, height: 180, borderRadius: "50%" }}
                />
              </Button>
            </label>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              sx={{ mt: 2, bgcolor: "#FFF4CC", color: "#000" }}
              onClick={() => handleEditProfile(setEditMode)}
            >
              Edit profile
            </Button>
          </Stack>

          <Stack spacing={1} sx={{ width: "60%", pt: 2 }}>
            <Typography sx={{ fontSize: 40, fontWeight: "bold" }}>
              Hello Everyone
            </Typography>
            <Typography
              sx={{ fontSize: 20, fontWeight: "light", fontStyle: "italic" }}
            >
              My name
            </Typography>
            <Box sx={{ position: "relative", mt: 1, mb: 2 }}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_name_profile.png?alt=media"
                alt="Name Background"
                style={{ width: "100%" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "30%",
                  left: "5%",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {name || ""}
              </Box>
            </Box>

            <Box
              sx={{
                bgcolor: "grey.300",
                p: 2,
                borderRadius: 2,
                transition: "opacity .5s ease-in-out",
              }}
            >
              <Stack spacing={1}>
                {editMode ? (
                  <>
                    <TextField
                      label="Name"
                      value={name || ""}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      sx={{ padding: "0 0 .5rem 0" }}
                    />
                    <TextField
                      label="Email"
                      value={email || ""}
                      fullWidth
                      sx={{ padding: "0 0 .5rem 0" }}
                      disabled
                    />
                  </>
                ) : (
                  <>
                    <Box>
                      <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
                      {name || ""}
                    </Box>
                    <Box>
                      <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
                      {email || ""}
                    </Box>
                  </>
                )}
              </Stack>
            </Box>
          </Stack>
        </Stack>

        <TextField
          multiline
          rows={4}
          fullWidth
          value={userNote || ""}
          onChange={(e) => setUserNote(e.target.value)}
          placeholder="Show us your determination to conquer English here"
          sx={{ mt: 2 }}
          disabled={!editMode}
        />

        <Button
          variant="text"
          color="primary"
          sx={{
            textAlign: "center",
            fontStyle: "italic",
            textDecoration: "underline",
            mt: 2,
          }}
          onClick={() => handleChangePasswordOpen(setChangePasswordOpen)}
        >
          Change Password
        </Button>

        <Button
          onClick={
            editMode
              ? () =>
                  handleSave(
                    name || "",
                    userNote || "",
                    image,
                    setEditMode,
                    setIsLoading
                  )
              : handleClose
          }
          riant="contained"
          color="primary"
          sx={{ mt: 3, float: "right", bottom: ".5rem", bgcolor: "#ACCD0A" }}
        >
          {editMode ? "Save" : "Close"}
        </Button>

        <ChangePassword
          open={changePasswordOpen}
          handleClose={() => handleChangePasswordClose(setChangePasswordOpen)}
          variant="text"
        />
      </DialogContent>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1300,
          }}
        >
          <DotLoader dotSize="1rem" />
        </div>
      )}
    </Dialog>
  );
};

export default Profile;
