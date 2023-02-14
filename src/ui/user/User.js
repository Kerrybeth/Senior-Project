import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

const User = () => {
    return (
		<div>
			<Box component='button' style={{minHeight: '150px', minWidth: '150px', position: 'fixed', top: '100px'}}>
				<image>
				User Pic
				</image>
			</Box>
			<Box
				sx={{
					display: 'flex',
					minHeight: '100px',
					maxWidth: '1000px',
					border: 'solid',
					position: 'fixed', 
					top: '100px', 
					right: '100px'
				}}
			>
				<Typography variant="h3" style={{ 
					color: 'black', 
					justifyContent: 'left', 
					alignItems: 'left'
				}}>
				Name: 
				<br/>
				<br/>
				Bio:
				<br/>
				<br/>
				Description:
				<br/>
				</Typography>
				<Link to= "/UserEdit">
					<button style={{maxHeight:'50px',}}>
						<Typography variant ="h4" style={{ color: 'black', justifyContent: 'right', alignItems: 'right'}}>
						Edit
						</Typography>
					</button>
				</Link>
			</Box>
			<Box>
				<Typography variant ="h1" style={{ color: 'black', position: 'relative', top: '200px'}}>
				Availability
				</Typography>
			</Box>
		</div>
    );
}

export default User; 