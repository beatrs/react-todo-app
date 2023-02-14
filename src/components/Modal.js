import { GoogleLogin } from '@react-oauth/google'
import React from 'react'
import { useModalStore } from 'utils/useDataStore'

const Modal = () => {
	const toggleModal = useModalStore((state) => state.toggleModal)

	const resMsg = (res) => {
		console.log(res)
	}

	const errMsg = (err) => {
		console.log(err)
	}

	return (
		<div className="modal-wrapper">
			<div className="modal">
				<div className="header">
					<div className="close" onClick={toggleModal}>
						&times;
					</div>
				</div>
				<div className="body">
					<GoogleLogin onSuccess={resMsg} onError={errMsg} />
					{/* <button>Sync</button> */}
				</div>
			</div>
		</div>
	)
}

export default Modal