import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import App from './App';
import GameSessionForm from './GameSessionForm';
import AddCollectionForm from './AddCollectionForm';

// AddCollectionForm Tests
test('AddCollectionForm submits correct data', () => {
  const handleAdd = jest.fn();
  
  render(<AddCollectionForm onAdd={handleAdd} />);

  fireEvent.change(screen.getByPlaceholderText('Game Name'), { target: { value: 'Test Game' } });
  fireEvent.change(screen.getByPlaceholderText('Number of Players'), { target: { value: '4' } });
  fireEvent.change(screen.getByPlaceholderText('Estimated Playtime'), { target: { value: '60' } });
  fireEvent.change(screen.getByPlaceholderText('Purchase Price'), { target: { value: '29.99' } });

  fireEvent.click(screen.getByText('Add Game'));

  expect(handleAdd).toHaveBeenCalledWith(
    expect.objectContaining({
      name: 'Test Game',
      players: '4',
      estimatedTime: '60',
      purchasePrice: 29.99
    })
  );
});

// GameSessionForm Tests
// game session form renders with blank inputs
test('renders blank inputs', () => {
  render(<GameSessionForm onAdd={() => { }} />);

  expect(screen.getByPlaceholderText('Game Name')).toHaveValue("");
  expect(screen.getByPlaceholderText('Number of Players')).toHaveDisplayValue("");
  expect(screen.getByPlaceholderText('Score')).toHaveDisplayValue("");
  expect(screen.getByPlaceholderText('Minutes Played')).toHaveDisplayValue("");

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
    <GameSessionForm editingItem={editingItem} onUpdate={() => { }} />
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

  const { getByPlaceholderText, getByText } = render(
    <GameSessionForm onAdd={handleAdd} />
  );

  fireEvent.change(getByPlaceholderText('Game Name'), { target: { value: 'Catan' } });
  fireEvent.change(getByPlaceholderText('Number of Players'), { target: { value: '4' } });
  fireEvent.change(getByPlaceholderText('Score'), { target: { value: '90' } });
  fireEvent.change(getByPlaceholderText('Minutes Played'), { target: { value: '60' } });

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

test('renders all main navigation links in Navbar', async () => {
  await act(async () => {
    render(<App />);
  });

  expect(screen.getByRole('link', { name: /Play History/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Collection/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Stats/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Bookmarks/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Friends/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Browse/i })).toBeInTheDocument();
});

test('renders app without crashing', async () => {
  await act(async () => {
    render(<App />);
  });
});