import {makeStyles} from "@material-ui/core/styles";
const scannedImageListStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default scannedImageListStyles