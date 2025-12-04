use std::fs;

pub fn load(file: &str) -> String {
    fs::read_to_string("data/".to_owned() + file).expect("Should have been able to read the file")
}
