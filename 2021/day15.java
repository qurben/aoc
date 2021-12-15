import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

public class Day15 {
    public static void main(String[] args) throws Exception {

        int[] matrix = Files.readAllLines(Path.of(Objects.requireNonNull(Day15.class.getClassLoader().getResource("day15.txt")).getPath()))
                .stream().map(l -> Arrays.stream(l.split("")))
                .flatMapToInt(l -> l.mapToInt(Integer::parseInt))
                .toArray();

        System.out.println("Day 15, part 1 " + calculateCost(dijkstra(matrix, 0), matrix));

        int[] matrix2 = createPart2Map(matrix);

        System.out.println("Day 15, part 2 " + calculateCost(dijkstra(matrix2, 0), matrix2));
    }

    private static int[] dijkstra(int[] matrix, int start) {
        int[] dist = new int[matrix.length];
        int[] prev = new int[matrix.length];
        PriorityQueue<Node> Q = new PriorityQueue<>(matrix.length);

        int size = (int) Math.sqrt(matrix.length);

        for (int j = 0, matrixLength = matrix.length; j < matrixLength; j++) {
            dist[j] = Integer.MAX_VALUE;
        }

        dist[start] = 0;

        Q.offer(new Node(start, 0));

        while (!Q.isEmpty()) {
            int u = Q.poll().node;

            for (int v : getNeighbours(size, u)) {
                int alt = dist[u] + matrix[v];

                if (alt < dist[v]) {
                    dist[v] = alt;
                    prev[v] = u;
                    Q.offer(new Node(v, alt));
                }
            }
        }

        return prev;
    }

    private static List<Integer> getNeighbours(int size, int u) {
        List<Integer> result = new ArrayList<>();

        int x = (int) Math.floor(((double) u) / ((double) size));
        int y = u % size;

        if (x > 0) {
            result.add(u - size);
        }

        if (x < size - 1) {
            result.add(u + size);
        }

        if (y > 0) {
            result.add(u - 1);
        }

        if (y < size - 1) {
            result.add(u + 1);
        }

        return result;
    }


    private static int calculateCost(int[] prev, int[] matrix) {
        int cost = 0;
        int pos = matrix.length - 1;
        while (pos != 0) {
            cost += matrix[pos];
            pos = prev[pos];
        }

        return cost;
    }

    private static int lookup(int[] matrix, int i) {
        int oldSize = (int) Math.sqrt(matrix.length);
        int size = oldSize * 5;

        int x = (int) Math.floor(i / (double) size);
        int y = i % size;

        int xOffset = (int) Math.floor(x / (double) oldSize);
        int yOffset = (int) Math.floor(y / (double) oldSize);

        int val = matrix[(x - oldSize * xOffset) * oldSize + (y - oldSize * yOffset)];

        return (val + xOffset + yOffset - 1) % 9 + 1;
    }

    private static int[] createPart2Map(int[] matrix) {
        int[] newMap = new int[matrix.length * 25];

        for (int i = 0; i < matrix.length * 25; i++) {
            newMap[i] = lookup(matrix, i);
        }

        return newMap;
    }

    static class Node implements Comparable<Node> {
        public int node;
        public int cost;

        public Node(int node, int cost) {
            this.node = node;
            this.cost = cost;
        }

        @Override
        public int compareTo(Node o) {
            return Integer.compare(cost, o.cost);
        }
    }
}
