import { useForm, SubmitHandler } from 'react-hook-form';

export interface WithdrawFundsFormInputs {
  amount: number;
}

export default function WithdrawFundsModal({
  isOpen,
  loading,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (data: WithdrawFundsFormInputs) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WithdrawFundsFormInputs>({
    defaultValues: {
      amount: 0,
    },
  });

  const handleFormSubmit: SubmitHandler<WithdrawFundsFormInputs> = async (
    data
  ) => {
    try {
      console.log('Coolaborando en el evento:', data);
      onSubmit(data);
      reset();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="relative top-20 mx-auto max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex justify-between">
          <h2 className="text-xl font-bold">Retiro de la bóveda del evento</h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Cantidad a retirar:
            </label>
            <input
              {...register('amount', {
                required: 'Amount is required',
                min: {
                  value: 0,
                  message: 'Amount must be positive',
                },
                max: {
                  value: 1000000,
                  message: 'Amount is too high',
                },
                valueAsNumber: true,
              })}
              type="number"
              step="1"
              className={`w-full rounded-md border p-2 ${
                errors.amount ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter Amount"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-500">
                {errors.amount.message}
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
              {loading ? 'Retirando...' : 'Retirar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}