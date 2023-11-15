import { Button, Modal } from 'antd'
import React from 'react'
import { WarningIcon } from '../Icons'

interface ConfirmDeleteModalProps {
  isOpen: boolean
  type: string
  isLoading: boolean
  onClose: () => void
  onDelete: () => void
}

const ConfirmDeleteModal = ({
  isOpen,
  type,
  isLoading,
  onClose,
  onDelete,
}: ConfirmDeleteModalProps) => {
  return (
    <Modal
      title={
        <div className="flex gap-3 items-center mb-4">
          <WarningIcon />
          <h3 className="text-2xl font-semibold">Delete {type}</h3>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={(_, { CancelBtn }) => (
        <>
          <CancelBtn />
          <Button danger type="primary" onClick={onDelete} loading={isLoading}>
            Delete
          </Button>
        </>
      )}
    >
      Are you sure you want to delete this {type}?
    </Modal>
  )
}

export default ConfirmDeleteModal
