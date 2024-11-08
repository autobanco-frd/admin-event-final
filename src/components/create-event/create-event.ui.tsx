import { useForm, SubmitHandler } from "react-hook-form";

export interface EventFormInputs {
  name: string;
  price: number;
}

export default function CreateEventModal({
  isOpen,
  loading,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (data:EventFormInputs) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventFormInputs>({
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  const handleFormSubmit: SubmitHandler<EventFormInputs> = async (data) => {
    try {
      console.log("Creando el evento:", data);
      onSubmit(data);
      reset();
    } catch (error) {
      console.error("Error creando el evento:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="relative top-20 mx-auto max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex justify-between">
          <h2 className="text-xl font-bold">Crear Evento</h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              {...register("name", {
                required: "El nombre es obligatorio",
                minLength: {
                  value: 3,
                  message: "El nombre debe tener al menoos 3 caracteres",
                },
                maxLength: {
                  value: 40,
                  message: "El nombre NO debe tener maás de 40 caracteres",
                },
              })}
              type="text"
              className={`w-full rounded-md border p-2 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Nombre del evento"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Precio del Ticket (USDC)</label>
            <input
              {...register("price", {
                required: "El precio es obligatorio",
                min: {
                  value: 0,
                  message: "El precio debe ser positivo",
                },
                max: {
                  value: 1000000,
                  message: "Precio muy alto",
                },
                valueAsNumber: true,
              })}
              type="number"
              step="1"
              className={`w-full rounded-md border p-2 ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Precio del ticket"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-500">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
            >
              {loading ? "Creando..." : "Crear Evento"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
