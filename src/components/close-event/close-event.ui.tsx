export default function CloseEventModal({
  isOpen,
  loading,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) {
  const handleSubmit = async () => {
    try {
      console.log('Cerrando en el evento');
      onSubmit();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="relative top-20 mx-auto max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex justify-between">
          <h2 className="text-xl font-bold">
            ¿Estás seguro de que quieres cerrar el evento?
          </h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <div className="flex gap-6 justify-end">
          <button
            className="bg-purple-300 text-black font-semibold px-4 py-2 rounded basis-[50%] hover:text-white hover:bg-purple-400"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-red-300 text-black font-semibold px-4 py-2 rounded basis-[50%] hover:text-white hover:bg-red-400"
            onClick={onSubmit}
          >
            Cerrar Evento
          </button>
        </div>
      </div>
    </div>
  );
}
