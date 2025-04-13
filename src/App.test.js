import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import GameSessionForm from './GameSessionForm';

// GAMESESSIONFORM TESTS

// game session form renders with blank inputs
test('renders blank inputs', () => {
    render(<GameSessionForm onAdd={() => {}} />);

    expect(screen.getByPlaceholderText('Game Name')).toHaveValue('');
    expect(screen.getByPlaceholderText('Number of Players')).toHaveValue(0);
    expect(screen.getByPlaceholderText('Score')).toHaveValue(0);
    expect(screen.getByPlaceholderText('Minutes Played')).toHaveValue(0);

});

// game session form edit prefills with game data
test('prefills form with editingItem data', () => {
  const editingItem = {
    name: "Catan",
    date: "2025-03-27",
    numPlayers: 3,
    score: 10,
    result: "Win",
    time: 180,
    comments: "Always a fun game",
};

const { getByDisplayValue } = render(
  <GameSessionForm editingItem = {editingItem} onUpdate={() => {}} />
);
  expect(getByDisplayValue('Catan')).toBeInTheDocument();
  expect(getByDisplayValue('2025-03-27')).toBeInTheDocument();
  expect(getByDisplayValue('3')).toBeInTheDocument();
  expect(getByDisplayValue('10')).toBeInTheDocument();
  expect(getByDisplayValue('Win')).toBeInTheDocument();
  expect(getByDisplayValue('180')).toBeInTheDocument();
  expect(getByDisplayValue('Always a fun game')).toBeInTheDocument();
});

// game session form adds a session when 'Add Session' is clicked
test('calls onAdd with correct data onSubmit', () => {
  const handleAdd = jest.fn();

  const { getByPlaceholderText, getByText } = render (
    <GameSessionForm onAdd={handleAdd} />
  );

  fireEvent.change(getByPlaceholderText('Game Name'), {target: { value: 'Catan'}});
  fireEvent.change(getByPlaceholderText('Number of Players'), {target: { value: '4'}});
  fireEvent.change(getByPlaceholderText('Score'), {target: { value: '90'}});
  fireEvent.change(getByPlaceholderText('Minutes Played'), {target: { value: '60'}});

  fireEvent.click(getByText('Add Session'));

  expect(handleAdd).toHaveBeenCalledWith(
    expect.objectContaining({
      name: 'Catan',
      numPlayers: 4,
      score: 90,
      time: 60
    })
  );
});


