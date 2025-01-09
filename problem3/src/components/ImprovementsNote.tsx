import React from 'react';
import style from '../css/note.module.css'; // You can create your custom styles for this component

// 📌 Improvement Note Component
const ImprovementsNote: React.FC = () => {
  const improvements = [
    {
      problem: "Inefficient Filtering and Sorting Logic in useMemo",
      explanation: "The filter and sort operations are combined in a single useMemo, but the logic in filter is inconsistent and inefficient. lhsPriority is referenced in the filter, but it is undefined. Filtering and sorting should be separated for clarity and performance.",
      antiPattern: "The same function getPriority is being repeatedly called during both filtering and sorting, causing redundant computations.",
      improvement: "Filter the balances first, then sort them with precomputed priorities to avoid recalculating priorities multiple times."
    },
    {
      problem: "Undefined Variable lhsPriority in filter",
      explanation: "In the filter callback, the variable lhsPriority is used but never defined.",
      antiPattern: "Using an undefined variable leads to runtime errors.",
      improvement: "Replace lhsPriority with balancePriority."
    },
    {
      problem: "Mixing Business Logic in the View Component",
      explanation: "Business logic like getPriority, filtering, and formatting are tightly coupled inside the React component.",
      antiPattern: "This violates the Separation of Concerns principle.",
      improvement: "Move getPriority and filtering/sorting logic to utility functions or hooks for better reusability and clarity."
    },
    {
      problem: "Inefficient Handling of prices in useMemo",
      explanation: "The useMemo dependency includes prices, but prices is not actually used in the sorting/filtering logic.",
      antiPattern: "Adding unnecessary dependencies to useMemo causes unnecessary recomputations.",
      improvement: "Remove prices from the useMemo dependency array."
    },
    {
      problem: "Duplicate Mapping Operations (sortedBalances.map)",
      explanation: "sortedBalances is mapped twice — once to create formattedBalances and again to create rows.",
      antiPattern: "Mapping through the same data twice is inefficient and can be avoided.",
      improvement: "Combine these two mapping operations into one."
    },
    {
      problem: "formatted Property Logic in formattedBalances",
      explanation: "balance.amount.toFixed() is used for formatting, but toFixed() expects an argument (number of decimal places).",
      antiPattern: "Defaulting to toFixed() without specifying precision can lead to unintended results.",
      improvement: "Pass a specific number of decimals (e.g., toFixed(2))."
    },
    {
      problem: "Hardcoded Priorities in getPriority",
      explanation: "Hardcoded priority values (100, 50, etc.) in getPriority reduce flexibility and maintainability.",
      antiPattern: "Magic numbers should be avoided.",
      improvement: "Store blockchain priorities in a Record<string, number> object or configuration file."
    },
    {
      problem: "Missing Fallback in prices Lookup",
      explanation: "prices[balance.currency] assumes every currency exists in prices, which might lead to NaN if prices[balance.currency] is undefined.",
      antiPattern: "Unchecked access to dynamic object properties can cause runtime errors.",
      improvement: "Use a fallback value, e.g., prices[balance.currency] || 0."
    },
    {
      problem: "Poor Readability and Maintainability",
      explanation: "The code lacks clear separation of concerns, and multiple nested operations reduce readability.",
      antiPattern: "Poor code organization makes it harder to debug and maintain.",
      improvement: "Refactor the logic into separate utility functions or hooks (useSortedBalances, useFormattedBalances)."
    }
  ];

  return (
    <div className={style.improvementsNote}>
      <h2>Code Improvements & Best Practices</h2>
      {improvements.map((item, index) => (
        <div key={index} className={style.improvementsItem}>
          <h3>----- {item.problem} -----</h3>
          <p><strong>Explanation:</strong> {item.explanation}</p>
          <p><strong>Anti-Pattern:</strong> {item.antiPattern}</p>
          <p><strong>Improvement:</strong> {item.improvement}</p>
        </div>
      ))}
    </div>
  );
};

export default ImprovementsNote;
