import { FiX } from 'react-icons/fi'

export default function Toasts({ toasts, onDismiss }) {
	if (!toasts.length) return null

	return (
		<div className="toast-stack" role="status" aria-live="polite">
			{toasts.map((toast) => (
				<div className="toast" key={toast.id}>
					<span className="toast-message">{toast.message}</span>
					{toast.onAction && (
						<button
							className="toast-action"
							type="button"
							onClick={() => {
								toast.onAction()
								onDismiss(toast.id)
							}}
						>
							{toast.actionLabel}
						</button>
					)}
					<button
						className="toast-close"
						type="button"
						aria-label="Dismiss notification"
						onClick={() => onDismiss(toast.id)}
					>
						<FiX />
					</button>
				</div>
			))}
		</div>
	)
}
