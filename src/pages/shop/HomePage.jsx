import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import HeroSection from "../../components/HeroSection";
import { getProducts } from "../../services/api";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

export default function ShopHome() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sort, setSort] = useState(""); // počinjemo s praznim - za placeholder
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
  ];

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch((err) => {
        console.error("Greška prilikom dohvaćanja proizvoda:", err);
      });
  }, []);

  useEffect(() => {
    let result = [...products];

    if (search) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    result = result.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    result.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      if (sort === "oldest") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    setFiltered(result);
  }, [search, sort, priceRange, products]);

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen">
    <HeroSection
      title="Discover Our Latest Collection"
      subtitle="The best fragrances handpicked just for you."
      backgroundImage="/img/bg.jpg"
    />

    <div className="mb-12 px-4 max-w-[1280px] mx-auto">
      
      <div className="mb-12 flex flex-col lg:flex-row gap-6 items-center justify-center lg:justify-between px-2">

        <div className="w-full lg:w-1/3">
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <div className="w-full lg:w-1/4 relative">
          <Listbox value={sort} onChange={setSort}>
            <div className="relative w-full">
              <ListboxButton className="relative w-full cursor-default rounded-full bg-white py-3 pl-5 pr-10 text-left border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-gray-700">
                {sort === "" ? "Sort by" : sortOptions.find((o) => o.value === sort)?.label}
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </ListboxButton>

              <ListboxOptions className="absolute z-10 mt-2 w-full rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm text-gray-800">
                {sortOptions.map((option) => (
                  <ListboxOption
                    key={option.value}
                    value={option.value}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-3 pl-10 pr-4 ${
                        active ? "bg-purple-100 text-purple-700" : "text-gray-900"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-semibold" : ""}`}>
                          {option.label}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>

        <div className="flex w-full lg:w-1/3 gap-4">
          <input
            type="number"
            inputMode="numeric"
            placeholder="Min €"
            className="w-1/2 px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition appearance-none"
            onChange={(e) => setPriceRange([+e.target.value || 0, priceRange[1]])}
          />
          <input
            type="number"
            inputMode="numeric"
            placeholder="Max €"
            className="w-1/2 px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition appearance-none"
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value || 1000])}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-2">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        )}
        </div>
      </div>
    </div>
  );
}
