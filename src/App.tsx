import React, { useState, useEffect } from "react";
import "./App.css";

interface Province {
  id: string;
  name: string;
}

interface City {
  id: string;
  name: string;
}

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [validCount, setValidCount] = useState<number | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  // Fetching provinces from API
  useEffect(() => {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((res) => res.json())
      .then((data) => setProvinces(data))
      .catch((err) => {
        console.error("Gagal mengambil data provinsi:", err);
      });
  }, []);

  // Fetching cities when a province is selected
  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince.id}.json`)
        .then((res) => res.json())
        .then((data) => setCities(data))
        .catch((err) => console.error("Gagal mengambil data kota:", err));
    }
  }, [selectedProvince]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const number = parseInt(inputValue);
    if (number >= 1 && number <= 32) {
      setValidCount(number);
      setShowMenu(true);
      setErrorMessage("");
      setWarningMessage(""); // Hide warnings when input is valid
    } else {
      setErrorMessage("Jumlah provinsi harus antara 1 hingga 32.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const number = parseInt(val);
    if (number > 32) {
      setWarningMessage("Maksimal hanya bisa memilih 32 provinsi.");
    } else {
      setWarningMessage(""); // Hide warning if input is valid
    }
    if (number >= 1 && number <= 32) {
      setInputValue(val);
    }
  };

  return (
    <div className="app">
      {!showMenu && (
        <form onSubmit={handleSubmit} className="input-form">
          <label>
            Masukkan jumlah provinsi yang ingin ditampilkan (1-32):
            <input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              min="1"
              max="32"
            />
          </label>
          <button type="submit">Submit</button>
          {errorMessage && <p className="error">{errorMessage}</p>}
          {warningMessage && <p className="warning">{warningMessage}</p>} {/* Display warnings */}
        </form>
      )}

      {showMenu && (
        <div className="burger-app">
          <BurgerMenu
            provinces={validCount !== null ? provinces.slice(0, validCount) : []}
            onSelect={setSelectedProvince}
          />
          <div className="content">
            {selectedProvince ? (
              <div>
                <h2>{selectedProvince.name}</h2>
                <ul>
                  {cities.length > 0 ? (
                    cities.map((city) => <li key={city.id}>{city.name}</li>)
                  ) : (
                    <p>Sedang mengambil data kota...</p>
                  )}
                </ul>
              </div>
            ) : (
              <p>Silakan pilih provinsi dari menu.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function BurgerMenu({
  provinces,
  onSelect,
}: {
  provinces: Province[];
  onSelect: (province: Province) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="burger-menu">
      <button className={`burger-button ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
        ☰
      </button>
      {open && (
        <ul className="menu-list">
          {provinces.map((prov) => (
            <li key={prov.id} onClick={() => onSelect(prov)}>
              {prov.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
