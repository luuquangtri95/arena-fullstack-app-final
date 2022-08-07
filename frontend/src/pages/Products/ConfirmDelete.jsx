import { Modal, TextContainer } from '@shopify/polaris'

function ConfirmDelete(props) {
  const { onDiscard = null, onSubmit = null } = props

  return (
    <Modal
      open={true}
      onClose={onDiscard}
      title="Are you sure want to delete?"
      secondaryActions={[
        {
          content: 'Discard',
          onAction: onDiscard,
        },

        {
          content: 'Delete now',
          onAction: onSubmit,
          destructive: true,
        },
      ]}
    >
      <Modal.Section>
        <TextContainer>
          <p>This cannot be undone.</p>
        </TextContainer>
      </Modal.Section>
    </Modal>
  )
}

export default ConfirmDelete
