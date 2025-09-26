import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HorseRacingApp.css';

const HorseRacingApp = () => {
    const [races, setRaces] = useState([]);
    const [selectedRace, setSelectedRace] = useState(null);
    const [jockeyStats, setJockeyStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(null);

    useEffect(() => {
        fetchSluzewiecData();

        // Update every 10 minutes
        const interval = setInterval(fetchSluzewiecData, 10 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const fetchSluzewiecData = async () => {
        setLoading(true);
        try {
            // Try to fetch from Służewiec website
            const sluzewiecData = await scrapeSluzewiecWebsite();

            if (sluzewiecData && sluzewiecData.length > 0) {
                setRaces(sluzewiecData);
                setSelectedRace(sluzewiecData[0]);
                generateJockeyStats(sluzewiecData);
                setLastUpdate(new Date());
                setError(null);
            } else {
                loadSaturdayRacingData();
            }
        } catch (err) {
            console.error('Error fetching Służewiec data:', err);
            setError('Using demo data');
            loadSaturdayRacingData();
        } finally {
            setLoading(false);
        }
    };

    const scrapeSluzewiecWebsite = async () => {
        try {
            const proxyUrl = 'https://api.allorigins.win/raw?url=';
            const sluzewiecUrl = 'https://torsluzewiec.pl/program-gonitw/';

            const response = await axios.get(proxyUrl + encodeURIComponent(sluzewiecUrl), {
                timeout: 15000,
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                }
            });

            if (response.data) {
                return parseSluzewiecHTML(response.data);
            }

            return null;
        } catch (error) {
            console.error('Failed to scrape Służewiec website:', error);
            return null;
        }
    };

    const parseSluzewiecHTML = (html) => {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Look for race information
            const raceElements = doc.querySelectorAll('.race-item, .gonitwa, [class*="race"], .program-item');
            const races = [];

            if (raceElements.length > 0) {
                raceElements.forEach((element, index) => {
                    if (index < 9) { // Limit to 9 races for Saturday
                        const timeText = element.querySelector('.time, .godzina, [class*="time"]')?.textContent?.trim();
                        const titleText = element.querySelector('.title, .nazwa, h3, h4')?.textContent?.trim();
                        const distanceText = element.querySelector('.distance, .dystans')?.textContent?.trim();
                        const prizeText = element.querySelector('.prize, .nagroda')?.textContent?.trim();

                        races.push({
                            id: `saturday_${index + 1}`,
                            time: extractTime(timeText) || `${13 + index}:${index % 2 === 0 ? '00' : '30'}`,
                            title: titleText || `Race ${index + 1}`,
                            distance: extractDistance(distanceText) || `${1400 + (index % 3) * 200}m`,
                            prize: extractPrize(prizeText) || `${20000 + index * 3000} zł`,
                            status: 'upcoming',
                            venue: 'Tor Służewiec',
                            surface: index === 0 || index === 7 ? 'All-weather' : 'Turf',
                            horses: generateSaturdayHorses(index)
                        });
                    }
                });
            }

            return races.length > 0 ? races : null;
        } catch (error) {
            console.error('Error parsing HTML:', error);
            return null;
        }
    };

    const loadSaturdayRacingData = () => {
        const saturdayRaces = [
            {
                id: 'saturday_1',
                time: '13:00',
                title: '2-year-old Horses Group II - Domestic Breeding (PSB) Series A',
                distance: '1400m',
                prize: '21,000 zł',
                status: 'upcoming',
                venue: 'Tor Służewiec',
                surface: 'Turf',
                category: 'Group II',
                horses: [
                    { nr: 1, name: 'Sweet Chocolate', jockey: 'A. Reznikov', weight: 56, odds: '3.2', owner: 'Jaskólski Family', trainer: 'W. Olkowski', age: 2, form: '1-2-1', silks: '🟡⚫' },
                    { nr: 2, name: 'Granada', jockey: 'T. Kumarbek Uulu', weight: 56, odds: '4.5', owner: 'PPH Falba', trainer: 'J. Kozłowski', age: 2, form: '2-1-3', silks: '🔵⚪' },
                    { nr: 3, name: 'Oakley Martini', jockey: 'M. Zholchubekov', weight: 56, odds: '2.8', owner: 'UAB Žirgo Startas', trainer: 'T. Pastuszka', age: 2, form: '1-1-2', silks: '🟢⚫' },
                    { nr: 4, name: 'Katla', jockey: 'B. Marat Uulu', weight: 56, odds: '5.1', owner: 'SK Iwno & A. Skrzypczak', trainer: 'I. Karathanasis', age: 2, form: '3-2-4', silks: '🔴⚪' },
                    { nr: 5, name: 'Likya', jockey: 'K. Mazur', weight: 56, odds: '6.8', owner: 'M. Kaszubowski', trainer: 'C. Pawlak', age: 2, form: '4-3-1', silks: '🟣⚫' },
                    { nr: 6, name: 'Thunder Storm', jockey: 'K. Grzybowski', weight: 57, odds: '7.2', owner: 'Laskowski Family', trainer: 'A. Laskowski', age: 2, form: '2-4-3', silks: '⚫🟡' },
                    { nr: 7, name: 'Targoszyn', jockey: 'E. Zamudin Uulu', weight: 57, odds: '8.5', owner: 'M. Sołtysiak', trainer: 'A. Laskowski', age: 2, form: '5-3-2', silks: '🟠⚪' }
                ]
            },
            {
                id: 'saturday_2',
                time: '13:30',
                title: 'Michałowa Prize - Category A (International Arabian Horses)',
                distance: '2800m',
                prize: '56,000 zł',
                status: 'upcoming',
                venue: 'Tor Służewiec',
                surface: 'Turf',
                category: 'Category A',
                horses: [
                    { nr: 1, name: 'Monaasib (GB)', jockey: 'K. Dogdurbek Uulu', weight: 62, odds: '2.5', owner: 'Junior Speed srl', trainer: 'M. Jodłowski', age: 6, form: '1-2-1', silks: '🔵🟡' },
                    { nr: 2, name: "Eyd'a Alfash", jockey: 'B. Kalysbek Uulu', weight: 60, odds: '3.8', owner: 'M. Dąbrowski & M. Nieznańska', trainer: 'K. Rogowski', age: 5, form: '2-1-2', silks: '⚪🔴' },
                    { nr: 3, name: 'Lindahls Anakin (DK)', jockey: 'K. Mazur', weight: 62, odds: '4.2', owner: 'A. Lindahl', trainer: 'C. Pawlak', age: 5, form: '1-3-1', silks: '🟢⚪' },
                    { nr: 4, name: 'Cabaliros (FR)', jockey: 'S. Abaev', weight: 59, odds: '5.5', owner: 'A. Jabłońska-Kostrzewa', trainer: 'K. Rogowski', age: 4, form: '3-1-4', silks: '🟣🟡' },
                    { nr: 5, name: 'Largo Winch', jockey: 'E. Zamudin Uulu', weight: 59, odds: '6.2', owner: 'T. Mikołajczyk & K. Urbańczyk', trainer: 'K. Urbańczyk', age: 4, form: '2-3-2', silks: '⚫🔵' },
                    { nr: 6, name: 'Formuła MS', jockey: 'S. Mura', weight: 60, odds: '7.1', owner: 'M. Stelmaszczyk', trainer: 'A. Wyrzyk', age: 5, form: '4-2-3', silks: '🟠⚫' }
                ]
            },
            {
                id: 'saturday_3',
                time: '14:00',
                title: '2-year-old Horses Group II - Domestic Breeding (PSB) Series B',
                distance: '1400m',
                prize: '21,000 zł',
                status: 'upcoming',
                venue: 'Tor Służewiec',
                surface: 'Turf',
                category: 'Group II',
                horses: [
                    { nr: 1, name: 'Szekla', jockey: 'K. Mazur', weight: 56, odds: '3.1', owner: 'SK Iwno & N. Szelągowska', trainer: 'N. Szelągowska', age: 2, form: '1-2-1', silks: '🔴⚪' },
                    { nr: 2, name: 'Thulio', jockey: 'K. Grzybowski', weight: 57, odds: '2.9', owner: 'Rybaczyk Family', trainer: 'A. Laskowski', age: 2, form: '2-1-1', silks: '🟡🔵' },
                    { nr: 3, name: 'Damina', jockey: 'B. Marat Uulu', weight: 56, odds: '4.3', owner: 'SK Iwno & A. Skrzypczak', trainer: 'I. Karathanasis', age: 2, form: '1-3-2', silks: '🟢⚫' },
                    { nr: 4, name: 'Nagi Instynkt', jockey: 'K. Kamińska', weight: 57, odds: '5.8', owner: 'Multiple Owners', trainer: 'W. Szymczuk', age: 2, form: '3-4-3', silks: '🟣⚪' },
                    { nr: 5, name: 'Dexa Star', jockey: 'B. Kalysbek Uulu', weight: 56, odds: '6.4', owner: 'M. Krzysztofik', trainer: 'M. Łojek', age: 2, form: '2-3-4', silks: '🔵⚫' }
                ]
            },
            {
                id: 'saturday_4',
                time: '14:30',
                title: '3-year-old Arabian Horses Group II - Domestic Breeding (PASB) Series A',
                distance: '1800m',
                prize: '19,000 zł',
                status: 'upcoming',
                venue: 'Tor Służewiec',
                surface: 'Turf',
                category: 'Group II',
                horses: [
                    { nr: 1, name: 'Erama', jockey: 'M. Zholchubekov', weight: 56, odds: '4.1', owner: 'Z. Górski', trainer: 'M. Janikowski', age: 3, form: '2-1-3', silks: '🟢🟡' },
                    { nr: 2, name: 'Zartan', jockey: 'S. Vasyutov', weight: 58, odds: '3.7', owner: 'B. Maślanka', trainer: 'S. Vasyutov', age: 3, form: '1-2-2', silks: '⚫🔴' },
                    { nr: 3, name: 'Weiss', jockey: 'T. Kumarbek Uulu', weight: 58, odds: '5.2', owner: 'Ptach Family', trainer: 'S. Vasyutov', age: 3, form: '3-1-4', silks: '⚪🔵' },
                    { nr: 4, name: 'Haedus', jockey: 'K. Mazur', weight: 58, odds: '3.9', owner: 'Pawlak Family', trainer: 'C. Pawlak', age: 3, form: '1-3-1', silks: '🟣⚪' }
                ]
            },
            {
                id: 'saturday_5',
                time: '15:00',
                title: 'Vistula River Prize - Category B (Fillies & Mares)',
                distance: '2000m',
                prize: '50,000 zł',
                status: 'upcoming',
                venue: 'Tor Służewiec',
                surface: 'Turf',
                category: 'Category B',
                horses: [
                    { nr: 1, name: 'Demoon (FR)', jockey: 'K. Grzybowski', weight: 53, odds: '4.8', owner: 'R. Shaykhutdinov', trainer: 'E. Zahariev', age: 3, form: '2-3-1', silks: '🔵⚫' },
                    { nr: 2, name: 'Sunny Silence (USA)', jockey: 'E. Zamudin Uulu', weight: 56, odds: '2.9', owner: 'Millennium Stud', trainer: 'M. Jodłowski', age: 3, form: '1-1-2', silks: '🟡🔴' },
                    { nr: 3, name: 'Enchanted Way (GB)', jockey: 'K. Dogdurbek Uulu', weight: 53, odds: '3.5', owner: 'Plavac Sp. z o.o.', trainer: 'S. Plavac', age: 3, form: '2-2-1', silks: '🟢⚪' },
                    { nr: 4, name: 'Galicove (FR)', jockey: 'S. Abaev', weight: 53, odds: '5.1', owner: 'Millennium Stud', trainer: 'K. Ziemiański', age: 3, form: '1-4-3', silks: '🟠🔵' }
                ]
            },
            {
                id: 'saturday_6',
                time: '15:30',
                title: 'Handicap Race Group IV (3yo & older)',
                distance: '2200m',
                prize: '13,800 zł',
                status: 'upcoming',
                venue: 'Tor Służewiec',
                surface: 'Turf',
                category: 'Group IV Handicap',
                horses: [
                    { nr: 1, name: 'So Ellmar (FR)', jockey: 'B. Kalysbek Uulu', weight: 57, odds: '3.8', owner: 'R. Shaykhutdinov', trainer: 'E. Zahariev', age: 3, form: '1-2-3', silks: '🔴🟡' },
                    { nr: 2, name: 'Rue Boutebrie (FR)', jockey: 'M. Przybek', weight: 62, odds: '4.5', owner: 'A. Przybek', trainer: 'W. Olkowski', age: 3, form: '2-1-4', silks: '🟣⚪' },
                    { nr: 3, name: 'Zibi Dancer (FR)', jockey: 'K. Zwolińska', weight: 61, odds: '2.9', owner: 'Z. Górski', trainer: 'K. Ziemiański', age: 3, form: '1-1-2', silks: '🔵⚫' }
                ]
            },
            {
                id: 'saturday_7',
                time: '16:00',
                title: 'Eldon Prize - Arabian Horses Group I Domestic Breeding',
                distance: '2000m',
                prize: '23,000 zł',
                status: 'upcoming',
                venue: 'Tor Służewiec',
                surface: 'Turf',
                category: 'Group I',
                horses: [
                    { nr: 1, name: 'Super Story TR', jockey: 'S. Vasyutov', weight: 56, odds: '4.2', owner: 'T. Ruciński & A. Sienkiewicz', trainer: 'S. Vasyutov', age: 3, form: '1-3-2', silks: '⚪🟢' },
                    { nr: 2, name: 'Dekhal FA', jockey: 'B. Kalysbek Uulu', weight: 58, odds: '3.1', owner: 'K. Goździalski', trainer: 'M. Borkowski', age: 3, form: '2-1-1', silks: '🟡⚫' },
                    { nr: 3, name: 'Stefanos', jockey: 'K. Grzybowski', weight: 58, odds: '5.8', owner: 'SK Janów Podlaski', trainer: 'P. Nakoniechnyi', age: 3, form: '3-2-4', silks: '🔴⚪' }
                ]
            },
            {
                id: 'saturday_8',
                time: '16:30',
                title: 'Special Handicap Group IV - Arabian Horses (4yo & older)',
                distance: '1800m',
                prize: '12,000 zł',
                status: 'upcoming',
                venue: 'Tor Služewiec',
                surface: 'All-weather',
                category: 'Group IV Special',
                horses: [
                    { nr: 1, name: 'Niemen Nuit', jockey: 'K. Świat', weight: 52, odds: '5.2', owner: 'T. Pastuszka', trainer: 'T. Pastuszka', age: 4, form: '3-4-2', silks: '🟠🔵' },
                    { nr: 2, name: 'Al-Dzaster', jockey: 'K. Kamińska', weight: 52, odds: '4.1', owner: 'K. Rogowski', trainer: 'K. Rogowski', age: 4, form: '2-3-1', silks: '🟣🟡' },
                    { nr: 3, name: 'Astonishing Grace (FR)', jockey: 'E. Zamudin Uulu', weight: 63, odds: '2.8', owner: 'SK Andryjanki E. Sieciński', trainer: 'J. Domańska', age: 4, form: '1-1-3', silks: '🔵⚪' }
                ]
            },
            {
                id: 'saturday_9',
                time: '17:00',
                title: 'Race for 4-year-olds and older horses - Group IV only',
                distance: '2000m',
                prize: '13,800 zł',
                status: 'upcoming',
                venue: 'Tor Służewiec',
                surface: 'Turf',
                category: 'Group IV',
                horses: [
                    { nr: 1, name: 'Hornet (IRE)', jockey: 'K. Dogdurbek Uulu', weight: 60, odds: '3.2', owner: 'BMS Group S. Pegza', trainer: 'C. Fraisl', age: 4, form: '1-2-2', silks: '🟢⚫' },
                    { nr: 2, name: 'Zuzza (IRE)', jockey: 'S. Urmatbek Uulu', weight: 55, odds: '4.8', owner: 'K. Kozłowska & K. Miondlikowski', trainer: 'J. Kozłowski', age: 4, form: '2-3-4', silks: '🔴🟡' },
                    { nr: 3, name: 'Octola (IRE)', jockey: 'A. Reznikov', weight: 60, odds: '2.6', owner: 'A. Kabardov, S. Ochałek & K. Salamon', trainer: 'A. Kabardov', age: 6, form: '1-1-1', silks: '🟡🔵' }
                ]
            }
        ];

        setRaces(saturdayRaces);
        setSelectedRace(saturdayRaces[0]);
        generateJockeyStats(saturdayRaces);
        setLastUpdate(new Date());
    };

    const generateSaturdayHorses = (raceIndex) => {
        // This would generate horses based on the race index
        // For now, we'll use the static data from loadSaturdayRacingData
        return [];
    };

    const generateJockeyStats = (raceData) => {
        const jockeys = {};

        raceData.forEach(race => {
            race.horses.forEach(horse => {
                if (!jockeys[horse.jockey]) {
                    jockeys[horse.jockey] = {
                        name: horse.jockey,
                        wins: 0,
                        races: 0,
                        earnings: 0,
                        mounts: 0
                    };
                }
                jockeys[horse.jockey].races++;
                jockeys[horse.jockey].mounts++;

                // Simulate wins based on odds (lower odds = more likely to win)
                const oddsNum = parseFloat(horse.odds);
                if (oddsNum < 4) {
                    jockeys[horse.jockey].wins += Math.floor(Math.random() * 3) + 1;
                    jockeys[horse.jockey].earnings += Math.floor(Math.random() * 15000) + 5000;
                } else {
                    jockeys[horse.jockey].wins += Math.floor(Math.random() * 2);
                    jockeys[horse.jockey].earnings += Math.floor(Math.random() * 8000) + 2000;
                }
            });
        });

        const sortedJockeys = Object.values(jockeys)
            .map(jockey => ({
                ...jockey,
                winRate: jockey.races > 0 ? ((jockey.wins / (jockey.races * 3)) * 100).toFixed(1) : '0.0'
            }))
            .sort((a, b) => b.wins - a.wins)
            .slice(0, 8);

        setJockeyStats(sortedJockeys);
    };

    // Helper functions
    const extractTime = (text) => {
        if (!text) return null;
        const timeMatch = text.match(/(\d{1,2}):(\d{2})/);
        return timeMatch ? timeMatch[0] : null;
    };

    const extractDistance = (text) => {
        if (!text) return null;
        const distanceMatch = text.match(/(\d+)\s*m/i);
        return distanceMatch ? distanceMatch[0] : null;
    };

    const extractPrize = (text) => {
        if (!text) return null;
        const prizeMatch = text.match(/(\d+[\s,]*\d*)\s*(zł|PLN)/i);
        return prizeMatch ? prizeMatch[0] : null;
    };

    const getSaturdayDate = () => {
        const today = new Date();
        const saturday = new Date(today);
        const daysUntilSaturday = (6 - today.getDay()) % 7;
        saturday.setDate(today.getDate() + (daysUntilSaturday === 0 ? 7 : daysUntilSaturday));
        return saturday.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="racing-app">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <h2>Loading Służewiec Racing Data</h2>
                    <p>Fetching Saturday's race program...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="racing-app">
            <header className="header">
                <div className="header-content">
                    <div className="logo-section">
                        <h1>🏇 SŁUŻEWIEC RACECOURSE</h1>
                        <p>Saturday Race Program • Warsaw, Poland</p>
                    </div>
                    <div className="header-info">
                        <div className="race-date">
                            <span className="date-label">📅 {getSaturdayDate()}</span>
                        </div>
                        <div className="update-status">
                            {lastUpdate && (
                                <span>Last update: {lastUpdate.toLocaleTimeString()}</span>
                            )}
                            {error && <span className="error-badge">Demo Mode</span>}
                        </div>
                    </div>
                </div>
            </header>

            <div className="content">
                <aside className="race-sidebar">
                    <div className="sidebar-header">
                        <h2>🏁 Today's Races</h2>
                        <p>{races.length} races scheduled</p>
                    </div>

                    <div className="race-list">
                        {races.map((race, index) => (
                            <div
                                key={race.id}
                                className={`race-item ${selectedRace?.id === race.id ? 'active' : ''}`}
                                onClick={() => setSelectedRace(race)}
                            >
                                <div className="race-number">{index + 1}</div>
                                <div className="race-content">
                                    <div className="race-time">⏰ {race.time}</div>
                                    <div className="race-title">{race.title}</div>
                                    <div className="race-metadata">
                                        <span className="distance">📏 {race.distance}</span>
                                        <span className="prize">💰 {race.prize}</span>
                                    </div>
                                    <div className="race-surface">
                    <span className={`surface-tag ${race.surface.toLowerCase()}`}>
                      {race.surface === 'Turf' ? '🌱' : '🏁'} {race.surface}
                    </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                <main className="main-content">
                    {selectedRace ? (
                        <div className="race-details">
                            <header className="race-header">
                                <div className="race-title-section">
                                    <h2>🏆 {selectedRace.title}</h2>
                                    <div className="race-badges">
                                        <span className="category-badge">{selectedRace.category}</span>
                                        <span className="surface-badge">{selectedRace.surface}</span>
                                    </div>
                                </div>

                                <div className="race-info-grid">
                                    <div className="info-card">
                                        <div className="info-icon">⏰</div>
                                        <div className="info-content">
                                            <span className="info-label">Post Time</span>
                                            <span className="info-value">{selectedRace.time}</span>
                                        </div>
                                    </div>

                                    <div className="info-card">
                                        <div className="info-icon">📏</div>
                                        <div className="info-content">
                                            <span className="info-label">Distance</span>
                                            <span className="info-value">{selectedRace.distance}</span>
                                        </div>
                                    </div>

                                    <div className="info-card">
                                        <div className="info-icon">💰</div>
                                        <div className="info-content">
                                            <span className="info-label">Prize Money</span>
                                            <span className="info-value">{selectedRace.prize}</span>
                                        </div>
                                    </div>

                                    <div className="info-card">
                                        <div className="info-icon">🏁</div>
                                        <div className="info-content">
                                            <span className="info-label">Surface</span>
                                            <span className="info-value">{selectedRace.surface}</span>
                                        </div>
                                    </div>
                                </div>
                            </header>

                            <section className="horses-section">
                                <h3>🐎 Field & Runners</h3>

                                <div className="horses-table">
                                    <div className="table-header">
                                        <div className="col-number">#</div>
                                        <div className="col-silks">Silks</div>
                                        <div className="col-horse">Horse</div>
                                        <div className="col-jockey">Jockey</div>
                                        <div className="col-weight">Weight</div>
                                        <div className="col-odds">Odds</div>
                                        <div className="col-age">Age</div>
                                        <div className="col-form">Form</div>
                                        <div className="col-trainer">Trainer</div>
                                    </div>

                                    <div className="horses-list">
                                        {selectedRace.horses.map((horse, index) => (
                                            <div key={horse.nr} className={`horse-row ${index < 3 ? 'top-three' : ''}`}>
                                                <div className="col-number">
                                                    <span className="horse-number">{horse.nr}</span>
                                                </div>

                                                <div className="col-silks">
                                                    <span className="silks" title="Racing silks">{horse.silks}</span>
                                                </div>

                                                <div className="col-horse">
                                                    <div className="horse-info">
                                                        <strong className="horse-name">{horse.name}</strong>
                                                        <span className="owner-name">{horse.owner}</span>
                                                    </div>
                                                </div>

                                                <div className="col-jockey">
                                                    <span className="jockey-name">{horse.jockey}</span>
                                                </div>

                                                <div className="col-weight">
                          <span className="weight-value">
                            {horse.weight > 0 ? `${horse.weight}kg` : '—'}
                          </span>
                                                </div>

                                                <div className="col-odds">
                          <span className={`odds-value ${parseFloat(horse.odds) < 4 ? 'favorite' : ''}`}>
                            {horse.odds}
                          </span>
                                                </div>

                                                <div className="col-age">
                                                    <span className="age-value">{horse.age}yo</span>
                                                </div>

                                                <div className="col-form">
                                                    <span className="form-value">{horse.form}</span>
                                                </div>

                                                <div className="col-trainer">
                                                    <span className="trainer-name">{horse.trainer}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </div>
                    ) : (
                        <div className="no-selection">
                            <div className="selection-prompt">
                                <div className="prompt-icon">🏇</div>
                                <h2>Select a Race</h2>
                                <p>Choose a race from the schedule to view the field and betting information</p>
                            </div>
                        </div>
                    )}
                </main>

                <aside className="stats-sidebar">
                    <div className="jockey-leaderboard">
                        <h3>🏆 Top Jockeys</h3>
                        <div className="leaderboard-list">
                            {jockeyStats.map((jockey, index) => (
                                <div key={jockey.name} className="jockey-item">
                                    <div className={`rank ${index < 3 ? `position-${index + 1}` : ''}`}>
                                        {index + 1}
                                    </div>
                                    <div className="jockey-details">
                                        <div className="jockey-name">{jockey.name}</div>
                                        <div className="jockey-stats">
                                            <span className="wins">🏆 {jockey.wins} wins</span>
                                            <span className="rate">📊 {jockey.winRate}%</span>
                                        </div>
                                        <div className="earnings">💰 {jockey.earnings.toLocaleString()} zł</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="track-info">
                        <h3>ℹ️ Track Information</h3>
                        <div className="info-list">
                            <div className="info-row">
                                <span className="label">🏁 Track:</span>
                                <span className="value">Tor Służewiec</span>
                            </div>
                            <div className="info-row">
                                <span className="label">📍 Location:</span>
                                <span className="value">Warsaw, Poland</span>
                            </div>
                            <div className="info-row">
                                <span className="label">📞 Phone:</span>
                                <span className="value">+48 22 851 45 95</span>
                            </div>
                            <div className="info-row">
                                <span className="label">🌐 Website:</span>
                                <a href="https://torsluzewiec.pl" target="_blank" rel="noopener noreferrer">
                                    torsluzewiec.pl
                                </a>
                            </div>
                            <div className="info-row">
                                <span className="label">🎰 Betting:</span>
                                <a href="https://trafonline.pl" target="_blank" rel="noopener noreferrer">
                                    TRAF Online
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="refresh-section">
                        <button className="refresh-btn" onClick={fetchSluzewiecData}>
                            🔄 Refresh Data
                        </button>
                        <p className="refresh-note">
                            Data updates automatically every 10 minutes
                        </p>
                    </div>
                </aside>
            </div>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>🏇 Tor Służewiec</h4>
                        <p>Premier horse racing venue in Poland</p>
                        <p>ul. Puławska 266, 02-976 Warsaw</p>
                    </div>

                    <div className="footer-section">
                        <h4>🎰 Betting Partners</h4>
                        <p>TRAF - Official totalizator</p>
                        <p>Bet responsibly • 18+</p>
                    </div>

                    <div className="footer-section">
                        <h4>📱 Stay Connected</h4>
                        <p>Follow us for live updates</p>
                        <p>Race results & news</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2025 Tor Służewiec Racing App. All rights reserved.</p>
                    <p>Race data subject to change • Check official sources</p>
                </div>
            </footer>
        </div>
    );
};

export default HorseRacingApp;