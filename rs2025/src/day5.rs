use crate::utils::load;

pub fn day5() {
    let data = load("day5.txt");

    println!("{}", data.find("\n\n").unwrap());

    let mut split = data.split_inclusive("\n\n");

    let def = split.next().unwrap().trim();
    let data = split.next().unwrap();

    let mut ranges: Vec<(u64, u64)> = Vec::new();

    for line in def.lines() {
        let (from, to) = line.split_once("-").unwrap();

        ranges.push((from.parse::<u64>().unwrap(), to.parse::<u64>().unwrap()));
    }

    let mut count: u64 = 0;
    for line in data.lines() {
        let num = line.parse::<u64>().unwrap();
        if is_in_ranges(num, ranges.clone()) {
            count += 1;
        }
    }

    let all_ranges = get_all_ranges(ranges.clone());

    println!("Day 5 part 1 {}, part 2 {}", count, all_ranges);
}

fn is_in_ranges(num: u64, ranges: Vec<(u64, u64)>) -> bool {
    for range in ranges.clone() {
        if num >= range.0 && num <= range.1 {
            return true;
        }
    }
    return false;
}

fn get_all_ranges(ranges: Vec<(u64, u64)>) -> u64 {
    let mut ranges = ranges.clone();
    ranges.sort_by(|x, y| x.0.cmp(&y.0));

    let mut new_ranges: Vec<(u64, u64)> = Vec::new();
    new_ranges.push(ranges[0]);

    for range in &ranges[1..] {
        let last_range = new_ranges.last().unwrap().clone();
        if last_range.1 >= range.0 && last_range.1 >= range.1 {
            // skip
        } else if last_range.1 >= range.0 {
            new_ranges.pop();
            new_ranges.push((last_range.0, range.1))
        } else {
            new_ranges.push(*range)
        }
    }

    let mut total = 0;
    for range in new_ranges {
        println!("range {} {}", range.0, range.1);
        total += range.1 - range.0 + 1;
    }

    total
}
