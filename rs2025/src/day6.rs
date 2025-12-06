use crate::utils::load;

pub fn day6() {
    let data = load("day6.txt");

    let mut grid: Vec<Vec<&str>> = Vec::new();
    for line in data.lines() {
        let mut grid_line: Vec<&str> = Vec::new();
        for value in line.split_whitespace() {
            grid_line.push(value);
        }
        grid.push(grid_line);
    }

    let mut new_grid = Vec::new();

    for i in 0..grid.len() {
        let line = grid[i].clone();
        for j in 0..line.len() {
            if new_grid.get(j) == None {
                new_grid.push(Vec::new());
            }
            new_grid[j].push(grid[i][j])
        }
    }

    let mut total = 0;
    for line in new_grid.clone() {
        total += calc(*line.last().unwrap(), line[..(line.len() - 1)]
            .iter()
            .map(|x| x.parse::<u64>().unwrap()).collect());
    }

    let mut total2 = 0;
    let ops = data.lines().last().unwrap();
    let mut nums = Vec::new();
    let mut current_op = " ";
    for i in 0..ops.len() {
        let op = ops[i..(i + 1)].trim();
        if op != "" {
            current_op = op;
        }

        let num = build_num(i, &data);

        if num == 0 {
            total2 += calc(current_op, nums);

            nums = Vec::new();

            continue;
        }

        nums.push(num);
    }

    total2 += calc(current_op, nums);

    println!("Day 6 part 1: {}, part 2: {}", total, total2)
}

fn calc(op: &str, nums: Vec<u64>) -> u64 {
    match op {
        "+" => nums.iter().sum::<u64>(),
        "*" => nums.iter().product::<u64>(),
        _ => 0
    }
}

fn build_num(i: usize, data: &str) -> u64 {
    let lines: Vec<&str> = data.lines().collect();
    let relevant_lines = lines[..(lines.len() - 1)].to_vec();

    let string = relevant_lines
        .into_iter()
        .map(|line| &line[i..(i + 1)])
        .collect::<Vec<&str>>()
        .join("");

    let tstring = string.trim();

    tstring.parse::<u64>().unwrap_or(0)
}
