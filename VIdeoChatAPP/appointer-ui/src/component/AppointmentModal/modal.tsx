interface IModal {
	closeModal: () => void;
}

const Modal: React.FC<IModal> = ({ closeModal }) => {
	return (
		<div className="appointmentModal_container">
			<div className="modal_close">
				<button onClick={() => closeModal()}>close</button>
			</div>
			<div className="appointmentModal">
				<div className="modal_header">
					<h5 style={{ paddingLeft: "5px" }}>Create Event</h5>
				</div>
				<form className="appointmentModal_Form">
					<div className="form_element">
						<label>Add title</label>
						<input type="text" placeholder="Type title...." />
					</div>
					<div className="form_element">
						<label>Select Event type:</label>
						<select id="Events">
							<option value="birthday">Birthday</option>
							<option value="meeting">meeting</option>
							<option value="reminder">Reminder</option>
						</select>
					</div>

					<button className="form_element">
						Add video conference
					</button>
					<button type="submit" className="form_element">
						Complete
					</button>
				</form>
			</div>
		</div>
	);
};
export default Modal;
