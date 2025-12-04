use crate::utils::load;

pub fn day4() {
    let data = load("day4.txt");
    let lines = data.lines();

    let mut grid: Vec<Vec<char>> = lines
        .clone()
        .map(|x| x.chars().map(|y| y).collect())
        .collect();

    let (_a, part_1, _b) = round(&grid, 0);

    let mut total_count = 0;
    let mut count = 1;
    while count > 0 {
        (grid, count, total_count) = round(&grid, total_count);
    }

    println!("Day 4 part 1: {}, part 2: {}", part_1, total_count)
}

fn round(
    grid: &Vec<Vec<char>>,
    total_count: u32,
) -> (Vec<Vec<char>>, u32, u32) {
    let mut count= 0;
    let mut new_grid = grid.clone();
    let w = grid[0].len() - 1;

    for x in 0..(grid.len()) {
        for y in 0..(w + 1) {
            if accessible(x, y, w, &grid) {
                new_grid[x][y] = '.';
                count += 1;
            }
        }
    }

    (new_grid, count, total_count + count)
}

fn accessible(x: usize, y: usize, width: usize, grid: &Vec<Vec<char>>) -> bool {
    let h = grid.len() - 1;

    let nw = if x == 0 || y == 0 {
        '.'
    } else {
        grid[x - 1][y - 1]
    };
    let n = if y == 0 { '.' } else { grid[x][y - 1] };
    let ne = if y == 0 || x == width {
        '.'
    } else {
        grid[x + 1][y - 1]
    };
    let e = if x == width { '.' } else { grid[x + 1][y] };
    let w = if x == 0 { '.' } else { grid[x - 1][y] };
    let sw = if x == 0 || y == h {
        '.'
    } else {
        grid[x - 1][y + 1]
    };
    let s = if y == h { '.' } else { grid[x][y + 1] };
    let se = if x == width || y == h {
        '.'
    } else {
        grid[x + 1][y + 1]
    };

    let surround = vec![nw, n, ne, e, w, sw, s, se];

    grid[x][y] == '@' && surround.iter().filter(|x| **x == '.').count() > 4
}
