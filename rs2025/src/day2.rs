use std::fs;

pub fn day2() {
    let data = fs::read_to_string("data/day2.txt").expect("Should have been able to read the file");

    let vals: Vec<Vec<u64>> = data
        .split(",")
        .map(|x| {
            x.split("-")
                .map(|x| x.parse::<u64>().unwrap())
                .collect::<Vec<u64>>()
        })
        .collect();

    let mut total = 0;
    let mut total2 = 0;
    for val in vals {
        total = total + find_invalid(val[0], val[1], false);
        total2 = total2 + find_invalid(val[0], val[1], true);
    }

    println!("Day2 part 1: {}, part 2: {}", total, total2)
}

fn find_invalid(from: u64, to: u64, part2: bool) -> u64 {
    let mut total = 0;

    for i in from..(to + 1) {
        if is_invalid(i, part2) {
            total = total + i;
        }
    }

    total
}

fn is_invalid(num: u64, part2: bool) -> bool {
    let binding = num.to_string();
    let half_len = binding.len() / 2;

    if part2 {
        for i in 1..(half_len + 1) {
            if binding == (&binding[..i]).repeat((binding.len()) / i) {
                return true;
            }
        }
    }

    &binding[..half_len] == &binding[half_len..]
}
