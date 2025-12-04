use crate::utils::load;

pub fn day3() {
    let data = load("day3.txt");

    let total_1: u64 = data.lines().map(|line| get_sum(line, 2)).sum();
    let total_2: u64 = data.lines().map(|line| get_sum(line, 12)).sum();

    println!("Day 3 part 1: {}, part 2: {}", total_1, total_2)
}

fn get_sum(line: &str, length: usize) -> u64 {
    let mut sum = "".to_string();

    let mut rest = line;
    let mut num: char;
    for i in (0..length).rev() {
        (num, rest) = find_highest(rest, i);
        sum.push(num);
    }

    sum.parse::<u64>().unwrap()
}

fn find_highest(line: &str, offset: usize) -> (char, &str) {
    let max = line[..(line.len() - offset)].chars().max().unwrap();
    let newpos = line.chars().position(|x| x == max).unwrap();

    (max, &line[(newpos + 1)..])
}
