import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

const UserEdit = () => {
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
				<label>
					Name:
					<input type="text" name="name"/>
				</label>
				<br/>
				<br/>
				<label>
					Bio:
					<input type="text" name="bio"/>
				</label>
				<br/>
				<br/>
				<label>
					Description:
					<input type="text" name="description"/>
				</label>
				<br/>
				</Typography>
				<Link to= "/User">
					<button style={{maxHeight:'50px',}}>
						<Typography variant ="h4" style={{ color: 'black', justifyContent: 'right', alignItems: 'right'}}>
						Back
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

export default UserEdit; 