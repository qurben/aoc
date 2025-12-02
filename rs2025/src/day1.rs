use std::fs;

pub fn day1() {
    let mut pos: i32 = 50;
    let mut past_0: u32 = 0;
    let mut count: u32 = 0;

    for line in fs::read_to_string("data/day1.txt")
        .expect("Should have been able to read the file")
        .lines()
    {
        (pos, past_0) = update_pos(line, pos, past_0);

        if pos == 0 {
            count = count + 1;
        }
    }

    println!("part 1: {}, part 2: {}", count, past_0)
}

pub fn update_pos(line: &str, pos: i32, past_0: u32) -> (i32, u32) {
    let direction = &line[..1];
    let amount = (&line[1..]).parse::<i32>().unwrap();

    let mut skips = 0;
    let mut curpos = pos;

    for _i in 0..amount {
        curpos = if direction == "L" {
            curpos + 100 - 1
        } else {
            curpos + 1
        } % 100;

        if curpos == 0 {
            skips = skips + 1
        }
    }

    (curpos.abs(), past_0 + skips)
}
