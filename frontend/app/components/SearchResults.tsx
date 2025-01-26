import Link from "next/link"
import { motion } from "framer-motion"

interface SearchResult {
  title: string
  href: string
}

interface SearchResultsProps {
  results: SearchResult[]
  onSelect: () => void
}

export function SearchResults({ results, onSelect }: SearchResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 mt-2 w-full bg-[#2A2A2A] border border-gray-700 rounded-md shadow-lg z-50"
    >
      <ul className="py-2">
        {results.map((result, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <Link
              href={result.href}
              className="block px-4 py-2 text-sm text-white hover:bg-[#00ADB5] hover:text-white transition-colors"
              onClick={onSelect}
            >
              {result.title}
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

