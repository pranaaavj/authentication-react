import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const CustomModal = ({ modalDetails }) => {
  return (
    <div>
      <Modal
        open={modalDetails.open}
        onClose={modalDetails.handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'>
            {modalDetails.title}
          </Typography>
          <Typography
            id='modal-modal-description'
            sx={{ mt: 2 }}>
            {modalDetails.body}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

CustomModal.propTypes = {
  modalDetails: PropTypes.object.isRequired,
};
