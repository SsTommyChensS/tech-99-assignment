import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import Spinner from './Spinner';

interface Currency {
    currency: string;
    price: number;
    date: string;
}

interface FormInputs {
    amount: string;
}

const CurrencySwapForm: React.FC = () => {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [fromCurrency, setFromCurrency] = useState<string>('');
    const [toCurrency, setToCurrency] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>();

    // Fetch currency data from API
    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://interview.switcheo.com/prices.json'); 
                setCurrencies(response.data); 
                if (response.data.length > 0) {
                    setFromCurrency(response.data[0].currency);
                    setToCurrency(response.data[1]?.currency || response.data[0].currency);
                }
            } catch {
                setError('Failed to fetch currency data. Please try again later.');
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            }
        };

        fetchCurrencies();
    }, []);

    // Swap the currencies
    const handleCurrencySwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setResult(''); // Clear result after swap
    };

    // Handle From Currency Change
    const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFromCurrency(e.target.value);
        setResult('');
    };

    // Handle To Currency Change
    const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setToCurrency(e.target.value);
        setResult('');
    };

    // Calculate conversion
    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        const fromPrice = currencies.find(c => c.currency === fromCurrency)?.price || 1;
        const toPrice = currencies.find(c => c.currency === toCurrency)?.price || 1;

        const convertedAmount = (parseFloat(data.amount) * fromPrice) / toPrice;
        setResult(convertedAmount.toFixed(4));
    };

    if (loading) {
        return (
            <div className="flex justify-center gap-2">
                <Spinner />
                <span className="text-2xl text-gray-600">Loading currencies...</span>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-2xl text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 border">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Currency Exchange Tool</h2>
            
            {/* From Currency Selection */}
            <div className="mb-4">
                <label 
                    className="block text-gray-600 mb-2"
                    htmlFor="from_currency"
                >
                    From Currency
                </label>
                <select
                    value={fromCurrency}
                    id="from_currency"
                    onChange={handleFromCurrencyChange}
                    className="w-full p-2 border rounded-md"
                >
                    {currencies.map((currency, index) => (
                        <option key={index} value={currency.currency}>
                            {currency.currency}
                        </option>
                    ))}
                </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center my-2">
                <button
                    onClick={handleCurrencySwap}
                    className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition"
                >
                    ⇄ Swap Currencies
                </button>
            </div>

            {/* To Currency Selection */}
            <div className="mb-4">
                <label className="block text-gray-600 mb-2">To Currency</label>
                <select
                    value={toCurrency}
                    onChange={handleToCurrencyChange}
                    className="w-full p-2 border rounded-md"
                >
                    {currencies.map((currency, index) => (
                        <option key={index} value={currency.currency}>
                            {currency.currency}
                        </option>
                    ))}
                </select>
            </div>

            {/* Amount Input with Validation */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">Amount</label>
                    <input
                        type="number"
                        placeholder="Enter amount"
                        className={`w-full p-2 border rounded-md ${errors.amount ? 'border-red-500' : 'border-gray-300'}`}
                        {...register('amount', {
                            required: 'Amount is required',
                            min: { value: 0.01, message: 'Amount must be greater than 0' },
                            pattern: { value: /^[0-9]*\.?[0-9]+$/, message: 'Invalid amount format' }
                        })}
                    />
                    {errors.amount && (
                        <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
                    )}
                </div>

                {/* Convert Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Convert
                </button>
            </form>

            {/* Conversion Result */}
            {result && (
                <div className="mt-4 text-center text-gray-700">
                    <p>Converted Amount:</p>
                    <h3 className="text-xl font-bold">{result} {toCurrency}</h3>
                </div>
            )}
        </div>
    );
};

export default CurrencySwapForm;
